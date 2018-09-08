function listCreateStudents() {
    const appId = 'kid_BJXTsSi-e';
    const url = "https://baas.kinvey.com/appdata/" + appId + '/students/';
    const username = 'guest';
    const password = 'guest';
    const base64 = btoa(username + ':' + password);
    const authHeaders = {'Authorization': 'Basic ' + base64, 'Content-type': 'application/json'};
    loadData()

    function loadData() {
        $.ajax({
            method: 'GET',
            url: url,
            headers: authHeaders
        }).then(displayStudents)
            .catch(handleError)
    }

    function displayStudents(students) {
        students.sort((a,b)=>{
            return Number(a.ID-b.ID)
        })
        let table=$('#results')
        for (const student of students) {
            let tr=$('<tr>')
                .append($(`<td>${student.ID}</td>`))
                .append($(`<td>${student.FirstName}</td>`))
                .append($(`<td>${student.LastName }</td>`))
                .append($(`<td>${student.FacultyNumber}</td>`))
                .append($(`<td>${student.Grade}</td>`))
            table.append(tr)
        }
    }

    $('#btnCreate').on('click',function (event) {
        event.preventDefault()
        console.log($('#studentId').val())
        let data={
            ID:Number($('#studentId').val()),
            FirstName:$('#firstName').val(),
            LastName:$('#lastName').val(),
            FacultyNumber:$('#facultyNumber').val(),
            Grade:Number($('#grade').val())
        }
        console.log(data)
        console.log(url)
        $.ajax({
            method:'POST',
            url:url,
            headers:authHeaders,
            data:JSON.stringify(data)
        }).then(()=>{
            console.log('created')
        })
            .catch(handleError)
    })

    function handleError() {
        $(document.body).prepend($('<div>Error</div>'))
    }
}