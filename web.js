if (document.getElementById('ckeditor')) {
    import('@ckeditor/ckeditor5-
build - classic').then(function(ClassicEditor){
ClassicEditor.default
            .create(document.querySelector('#ckeditor'))
            .then(editor => {
                console.log(editor);
            })
            .catch(error => {
                console.error(error);
            });
});
}