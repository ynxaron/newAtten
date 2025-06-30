// The function would take two arguments, one optional and one essential.
// In optional argument it clarifies the color you want this box to be,
// and in essential what message you want this box to deliever
function showText(message, color = "#825995") {
  const $text = $(`
        <div style="
          background-color: ${color},
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          margin-top: 10px;
          font-weight: 500;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        ">
          ${message}
        </div>
      `);

  $("#text-container").append($text);

  setTimeout(() => {
    $text.fadeOut(500, function () {
      $(this).remove();
    });
  }, 2000);
}
