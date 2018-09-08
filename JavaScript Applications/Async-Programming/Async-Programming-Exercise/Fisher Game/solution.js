function attachFourEvents() {
    const appId = 'kid_ByqMFEWP7';
    const url = "https://baas.kinvey.com/appdata/" + appId + '/biggestCatches';
    const username = 'peter';
    const password = 'p';
    const base64 = btoa(username + ':' + password);
    const authHeaders = {'Authorization': 'Basic ' + base64};
    $('.load').on('click', loadBiggestCatches)
    const catchesDiv = $('#catches')

    function loadBiggestCatches() {
        $.ajax({
            method: 'GET',
            url: url,
            headers: authHeaders
        }).then(displayBiggestCatches)
            .catch(handleError)

        function displayBiggestCatches(catches) {
            catchesDiv.empty()
            for (const cought of catches) {
                let mainDiv = $(`<div class="catch" data-id="${cought._id}">`)
                    .append($(`<label>Angler</label>`))
                    .append($(`<input type="text" class="angler" value="${cought.angler}"/>`))
                    .append($(`<label>Weight</label>`))
                    .append($(`<input type="number" class="weight" value="${cought.weight}"/>`))
                    .append($(`<label>Species</label>`))
                    .append($(`<input type="text" class="species" value="${cought.species}"/>`))
                    .append($(`<label>Location</label>`))
                    .append($(`<input type="text" class="location" value="${cought.location}"/>`))
                    .append($(`<label>Bait</label>`))
                    .append($(`<input type="text" class="bait" value="${cought.bait}"/>`))
                    .append($(`<label>Capture Time</label>`))
                    .append($(`<input type="number" class="captureTime" value="${cought.captureTime}"/>`))
                    .append($('<button class="update">Update</button>')
                        .on('click',updateCatch))
                    .append($('<button class="delete">Delete</button>')
                        .on('click', deleteCatch))
                catchesDiv.append(mainDiv)
            }
        }
    }

    $('.add').on('click', addCatch);

    function addCatch() {
        let addForm = $('#addForm')
        let anglerInput = addForm.find('.angler')
        let weightInput = addForm.find('.weight')
        let speciesInput = addForm.find('.species')
        let locationInput = addForm.find('.location')
        let baitInput = addForm.find('.bait')
        let captureTimeInput = addForm.find('.captureTime')
        let angler = anglerInput.val();
        let weight = Number(weightInput.val());
        let species = speciesInput.val();
        let location = locationInput.val();
        let bait = baitInput.val();
        let captureTime =Number(captureTimeInput.val());
        let obj = {angler, weight, species, location, bait, captureTime};
        $.ajax({
            method: 'POST',
            url: url,
            headers: {'Content-type': 'application/json', 'Authorization': 'Basic ' + base64},
            data: JSON.stringify(obj)
        }).then(loadBiggestCatches)
            .catch(handleError)

        anglerInput.val('')
        weightInput.val('')
        speciesInput.val('')
        locationInput.val('')
        baitInput.val('')
        captureTimeInput.val('')
    }

    function deleteCatch() {
        let catchItem = $(this).parent();
        let id=$(catchItem).attr('data-id')
        $.ajax({
            method:'DELETE',
            url:url+'/'+id,
            headers:authHeaders
        }).then(function () {
            catchItem.remove();
        })
            .catch(handleError)
    }

    function updateCatch() {
        let result = $(this).parent();
        let id=$(result).attr('data-id')
        let angler = $(result).find('.angler').val()
        let weight = Number($(result).find('.weight').val())
        let species = $(result).find('.species').val()
        let location = $(result).find('.location').val()
        let bait = $(result).find('.bait').val()
        let captureTime = Number($(result).find('.captureTime').val())
        let obj={angler,weight,species,location,bait,captureTime}

        $.ajax({
            method:'PUT',
            url:url+'/'+id,
            headers: {'Content-type': 'application/json', 'Authorization': 'Basic ' + base64},
            data: JSON.stringify(obj)
        }).then(function () {
            console.log('Updated')
        })
            .catch(handleError)
    }

    function handleError() {
        catchesDiv.empty()
        catchesDiv.text('Error')
    }
}

