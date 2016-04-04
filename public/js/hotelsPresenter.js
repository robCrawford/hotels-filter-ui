
var hotelsPresenter = (function($){
    
    //Private vars
    var qsParams = {};


    return {

        init: function(){
            //Bind event listeners
            this.bindEvents();

            //Get first results
            this.sync('/hotel?rating=10');
        },

        bindEvents: function(){
            var presenter = this;

            //Sort dropdown
            $('#update-sort').change(function() {
                qsParams["sort"] = this.value;
                presenter.sync('/hotel' + objectToQuerystring(qsParams));
            });

            //Filter fields
            $.each({
                distance: 'filter-distance',
                name: 'filter-name',
                stars: 'filter-stars',
                rating: 'filter-rating',
                price: 'filter-price'
            },
            function(qsField, fieldId) {
                $("#" + fieldId).blur(function() {
                    qsParams[qsField] = this.value;
                    presenter.sync('/hotel' + objectToQuerystring(qsParams));
                });
            });

            //Capture return key on filter fields
            $('input[type=text]').on('keyup', function(e) {
                if (e.which == 13) {
                    e.preventDefault();
                    this.blur();
                }
            });
        },

        sync: function(url) {
        //Sync results via AJAX
            var presenter = this;

            $.getJSON(url, function(data){
                presenter.render(data);
            });
        },

        render: function(data) {
        //Render view via Mustache
            var templates = this.templates,
                resultsHTML = "";

            $.each(data, function(i, hotel) {
                resultsHTML += Mustache.to_html(templates.hotelResult, hotel);
            });
            $('#results').html(resultsHTML);
        },

        //View templates
        templates: {
            hotelResult: '\
                <div class="item col-sm-4 col-lg-4 col-md-4 col-xs-6">\
                  <div class="product">\
                    <div class="image">\
                      <img src="{{ImageUrl}}" alt="" class="img-responsive">\
                    </div>\
                    <div class="description">\
                      <ul>\
                        <li class="hotel-title">{{Name}}, {{Location}}</li>\
                        <li>Distance: {{Distance}}</li>\
                        <li>Star rating: {{Stars}}</li>\
                        <li>User rating: {{UserRating}}, <i>{{UserRatingTitle}}</i></li>\
                        <li><b>From &pound;{{MinCost}}</b></li>\
                      </ul>\
                      <div><a class="btn btn-primary">More info</a></div>\
                    </div>\
                  </div>\
                </div>'
        }
    }

    /*
      Utils
    */
    function objectToQuerystring(ob) {
    //Compile an object into querystring format
        var retStr = "",
            sep = "?";

        for (var p in ob) {
            if (ob.hasOwnProperty(p)) {
                retStr += sep + p + "=" + ob[p];
                sep = "&";
            }
        }
        return retStr;
    }

})(window.jQuery);
