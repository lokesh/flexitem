$(function() {

  // Config
  var itemMinHeight = 60;

  var containerPropOptions = [
    {
      name: 'flex-direction',
      values: ['row', 'row-reverse', 'column', 'column-reverse']
    }, {
      name: 'flex-wrap',
      values: ['nowrap', 'wrap', 'wrap-reverse']
    }, {
      name: 'justify-content',
      values: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around']
    }, {
      name: 'align-items',
      values: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch']
    }, {
      name: 'align-content',
      values: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']
    }
  ];


  // Templates
  var propTemplate = _.template(
    $('#prop-template').html()
  );


  // Cache elements
  var $container = $('.js-container');
  var $containerProps     = $('.js-container-props');
  var $itemProps     = $('.js-item-props');
  var $code = $('.js-code');

  // Functions -------------------------------------------------------------------------------------

  function generateContainerOptions() {
    _.each(containerPropOptions, function(prop) {
      $containerProps.append(propTemplate(prop));
    })
  }

  function addItems(count) {
    for (var i = 0; i < count; i++) {
      var itemsCount = $('.item').length;
      var $div = $('<div />')
        .addClass('item')
        .css('height', itemMinHeight)
        .text(itemsCount + 1);
      $container.append($div);
    }
  }

  function removeItem() {
    $('.item').last().remove();
  }

  function randomizeItemHeights() {
    $('.item').each(function() {
      $(this).css('height', getRandomHeight());
    })
  }

  function getRandomHeight() {
      var heightSeed = Math.floor(Math.random() * 5);
      return Math.max(itemMinHeight, heightSeed * 40);
  }

  function makeItemsSameHeight() {
    $('.item').css('height', itemMinHeight + 'px');
  };

  function updateDemo() {
    $containerProps.find('.prop').each(function(i, prop) {
      var $prop  = $(prop);
      var prop   = $prop.data('prop');
      var $hover = $prop.find('.value.hover');
      var $value = $prop.find('.value.on');

      if ($hover.length > 0) {
        $container.css(prop, $hover.data('value'));
      } else if ($value.length > 0) {
        $container.css(prop, $value.data('value'));
      } else {
        $container.css(prop, '');
      }
    })
  }

  function updateCode() {
    var code = '.container {\n' +
               '    display: flex;\n';

    $containerProps.find('.prop').each(function(i, prop) {
      var $prop  = $(prop);
      var prop   = $prop.data('prop');
      var $hover = $prop.find('.value.hover');
      var $value = $prop.find('.value.on');

      if ($hover.length > 0) {
        code += '    ' + prop + ': ' + $hover.data('value') + ';\n';
      } else if ($value.length > 0) {
        code += '    ' + prop + ': ' + $value.data('value') + ';\n';
      }
    });

   code += '}';

   $code.html(code);

  }

  function update() {
    updateDemo();
    updateCode();
  }

  // Event Handlers --------------------------------------------------------------------------------

  $containerProps.on('mouseenter', '.value', function(e) {
    $(this).addClass('hover');
    update();
  });

  $containerProps.on('mouseleave', '.value', function(e) {
    $(this).removeClass('hover');
    update();
  });

  $containerProps.on('click', '.value', function(e) {
    var $this = $(this);
    $this.siblings('.value').removeClass('on');
    $this.toggleClass('on');

    update();
  });

  $('.js-add-item').on('click', function(e) {
    addItems(1);
  });

  $('.js-remove-item').on('click', function(e) {
    removeItem();
  });

  $('.js-same-height').on('click', function(e) {
    makeItemsSameHeight();
  });

  $('.js-random-heights').on('click', function(e) {
    randomizeItemHeights();
  });

  // Init ------------------------------------------------------------------------------------------

  addItems(5);
  randomizeItemHeights();
  generateContainerOptions();

});
