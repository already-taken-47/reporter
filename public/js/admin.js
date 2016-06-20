var files = new filesUploader('drop-zone', 'thumbnail', 1, function(uploadedImagesResponse) {
    console.log(uploadedImagesResponse)
});

ko.applyBindings(new BuildingsViewModel());

function BuildingsViewModel() {
    var self = this;
    
    self.buildings = ko.observable();

    self.buildings([
        {id: 1, title: 'first build', description: 'first descr', thumbnail: 'http://some_url.com'},
        {id: 2, title: 'second build', description: 'second descr', thumbnail: 'http://some_url.com'}
    ]);

    self.editBuilding = function() {
        self.buildings(null);
    };

    // Client-side routes
    Sammy(function() {
        this.get('/admin', function() {
            //todo Init all  data
            console.log('init admin');
        });
    }).run();
}