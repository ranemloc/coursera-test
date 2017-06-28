describe('menu', function () {

  var menucategories;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return an item', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items.json')
    .respond({
      menu_items: [{"id":108,"short_name":"FR1","name":"Vegetable Fried Rice"},
                   {"id":109,"short_name":"FR2","name":"Chicken Fried Rice"},
                  ],
    });
    menuService.getSingleMenuItem("FR2").then(function(response) {
      expect(response.short_name).toEqual("FR2");
    });
    $httpBackend.flush();
  });

  it('should return undefined', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items.json')
    .respond({
      menu_items: [{"id":108,"short_name":"FR1","name":"Vegetable Fried Rice"},
                   {"id":109,"short_name":"FR2","name":"Chicken Fried Rice"},
                  ],
    });
    menuService.getSingleMenuItem("X").then(function(response) {
      expect(response).toEqual(undefined);
    });
    $httpBackend.flush();
  });

});
