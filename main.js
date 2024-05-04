document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData();
    var fileInput = document.querySelector('input[type="file"]');
    formData.append('filetoupload', fileInput.files[0]);

    fetch('/runpython', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
});
