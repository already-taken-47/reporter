/**
 * Created by kir on 20.06.16.
 */

function filesUploader(
    dropZoneId,
    fileInputId,
    uploadingFilesAmountLimit,
    processingUploadedImagesCallback
) {
    var self = this;
    self.notice = '';
    self.files = [];

    if (!window.File || !window.FileList || !window.FileReader) {
        this.notice = 'Drag and drop function not available in your browser. Please click on link to upload files instead';
    }

    bindInput(fileInputId);
    bindZone(dropZoneId);

    function bindInput(fileInputId) {
        //todo Maybe to do it in native js
        var $fileInput = $('#' + fileInputId);
        $('#' + dropZoneId + ' a').click(function(e) {
            e.preventDefault();
            $fileInput.trigger('click');
        });
        $fileInput.change(function(e) {
            e.preventDefault();
            uploadFiles(this.files);
        });
    }

    function bindZone(dropZoneId) {
        var dropZone = document.getElementById(dropZoneId);
        dropZone.ondragover = function() {
            this.className = 'hovered'; return false;
        };
        dropZone.ondragend = function() {
            this.className = ''; return false;
        };
        dropZone.ondrop = function (event) {
            event.preventDefault && event.preventDefault();
            this.className = '';

            var files = event.dataTransfer.files;
            uploadFiles(files);

            return false;
        };
    }

    function uploadFiles(files) {
        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            if (i < uploadingFilesAmountLimit) {
                formData.append('file', files[i]);
            }
        }

        $.ajax({
            url: '/building/upload-thumbnail',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false
        }).done(function(response){
            processingUploadedImagesCallback(response)
        }).fail(function(response) {
            alert(response);
        });
    }
}