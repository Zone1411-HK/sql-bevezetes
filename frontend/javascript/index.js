async function GET(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

async function POST(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

async function generateStudents() {
    const tbody = document.querySelector('tbody');
    tbody.replaceChildren();

    let diakok = await GET('/api/diakok');
    diakok = diakok.diakok;

    for (const diak of diakok) {
        const tr = document.createElement('tr');
        const nev = document.createElement('td');
        nev.innerText = diak.nev;
        tr.appendChild(nev);

        const osztaly = document.createElement('td');
        osztaly.innerText = diak.osztaly;
        tr.appendChild(osztaly);

        const select = document.createElement('button');
        select.type = 'button';
        select.innerText = 'Kiválaszt';
        select.dataset.diakId = diak.id;
        select.addEventListener('click', generateGrades);
        tr.appendChild(select);

        tbody.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateStudents();
    document.getElementById('submitBtn').addEventListener('click', addGrade);
});

async function generateGrades() {
    let jegyek = await GET('/api/jegyek/' + this.dataset.diakId);
    jegyek = jegyek.result;

    const tbody = document.querySelectorAll('tbody')[1];
    tbody.replaceChildren();

    for (const jegy of jegyek) {
        const tr = document.createElement('tr');
        for (const value of Object.values(jegy)) {
            const td = document.createElement('td');
            td.innerText = value;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

async function addGrade() {
    const diakId = document.getElementById('diakId').value;
    const tanarId = document.getElementById('tanarId').value;
    const tantargy = document.getElementById('tantargy').value;
    const jegy = document.getElementById('jegy').value;

    if (diakId != '' && tanarId != '' && tantargy != '' && jegy != '') {
        const response = await POST('/api/jegyek', {
            diakId: diakId,
            tanarId: tanarId,
            tantargy: tantargy,
            jegy: jegy
        });
        console.log(response);
    }
}
