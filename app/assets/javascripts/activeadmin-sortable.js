(function($) {
  $(document).ready(function() {
    $('.handle').closest('tbody').activeAdminSortable();
  });

  $.fn.activeAdminSortable = function() {
    var wrap = this,
        fixSortableSizes;

    fixSortableSizes = function(wrap) {
      wrap.find('td').width('auto').each(function(i, td) {
        var $td;
        $td = $(td);
        $td.width($td.width());
      });
    };

    $(window).on('resize', function(){ fixSortableSizes(wrap) });
    fixSortableSizes(wrap);

    this.sortable({
      update: function(event, ui) {
        var url = ui.item.find('[data-sort-url]').data('sort-url'),
            $tr = ui.item.parents('tbody').find('tr');

        $.ajax({
          url: url,
          type: 'post',
          data: { position: ui.item.index() + 1 },
          success: function() {
            $tr.removeClass('even odd');
            $tr.filter(":even").addClass('odd');
            $tr.filter(":odd").addClass('even');
          }
        });
      }
    });

    this.disableSelection();
  }
})(jQuery);
