class task {
    constructor() {

    }

    error () {
        alert('Не введены данные для сортировки!')
    }

    searchLength(data) {
        let searchOptions = document.getElementById('searchOptions'),
            result = document.getElementById('result');
        result.value = '';
        if (searchOptions.value === '') {
            this.error();
        }
        if (searchOptions.value !== '') {
            data.forEach(sortLength);

            function sortLength(elem) {
                if (elem.length > +searchOptions.value) {
                    result.value += elem + ', ';
                }
            }
        }
    }

    searchSubstring (data,registr) {
        let searchOptions = document.getElementById('searchOptions'),
             result = document.getElementById('result'),
             newMass;
        result.value = '';
        if (searchOptions.value === ''){
            this.error();
        }
        if (searchOptions.value !== '') {
            if (registr === false) {
                newMass = data.filter(function sortSubstring(elem) {
                    if (elem.toUpperCase().indexOf(searchOptions.value.toUpperCase()) !== -1) {
                        return true;
                    }
                });
            }

            if (registr === true) {
                newMass = data.filter(function sortSubstring(elem) {
                    if (elem.indexOf(searchOptions.value) !== -1) {
                        return true;
                    }
                });
            }

            for (let i in newMass) {
                result.value += newMass[i] + ', ';
            }
        }
    }


}


let returnObjectFromJSONRequest = function(url) {
    let request = new XMLHttpRequest(),
        output = {};
    request.open('GET',url, false);
    request.withCredentials = true;
    request.send();

    if (request.status === 200) {
        return output = JSON.parse(request.response);
    }

    return output;
    };

let data = returnObjectFromJSONRequest('http://mrsoft.by/data.json'),
    form = document.getElementById('form'),
    massInf = data.data,
    searchLengthBtn = document.getElementById('searchLength'),
    searchSubstring = document.getElementById('searchSubstring'),
    register = document.getElementById('register'),
    mrTask = new task();


form.addEventListener('click', function (event) {
    if (event.target === searchLengthBtn) {
            mrTask.searchLength(massInf);
        }
        if (event.target === searchSubstring) {
            let checkReg;
            if (register.checked === true) {
                checkReg = true;

            } else {
                checkReg = false;
            }
            mrTask.searchSubstring(massInf, checkReg);
        }

});
