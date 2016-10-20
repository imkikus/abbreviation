var API_KEY = 'zzltaSQ6Qumsh9PDiGIfvmK6Ynn5p1jDpkbjsnqtaOK6kibtug';

App.controller('all', function(page) {
  // $fullforms.hide();
  var $template = $(page).find('.fullform-details').remove();
  var $fullforms = $(page).find('.fullforms-list');

  var form = page.querySelector('form'),
      input = page.querySelector('form .app-input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    input.blur();
    if(typeof input.value === 'undefined' || input.value === '') {
      $(page).find('.placeholder').show();
      $(page).find('.placeholder .text').text('Please enter the user login name you are looking to search for...');
    } else {
      $fullforms.hide();
      $(page).find('.placeholder').hide();
      $('.loader').show();
      var url = "https://daxeel-abbreviations-v1.p.mashape.com/all/"+input.value
      $.ajax({
        url: url,
        method: 'GET',
        headers: {
          'X-Mashape-Key': API_KEY 
        },
        success: function(resp) {
          var all_abbr = JSON.parse(resp);
          $fullforms.show();
          $(page).find('.fullform-details').remove();
          if(all_abbr[0].fullform !== 'Not found' && all_abbr[0].meaning !== 'Not found') {
            all_abbr.forEach(function(value) {
              var $details = $template.clone(true);
              $details.find('.full-form').text(value.fullform);
              $details.find('.meaning').text(value.meaning);
              $fullforms.append($details);
            });
            $('.loader').hide();
          } else {
            $fullforms.hide();
            $('.loader').hide();
            $(page).find('.placeholder').show();
            $(page).find('.placeholder .text').text('Sorry! couldn\'t find the result acronym username "'+input.value+'"');
          }
        },
        error: function(error) {
          App.dialog({
            title: 'Oops!',
            text: 'Action ended in error',
            okbutton: 'OK'
          })
        }
      });
    }
  });
});

try {
  // try to restore previous session
  App.restore();
} catch (err) {
  // else start from scratch
  App.load('all');
}