function showText(message, color = "#825995") {
  const $text = $(`
        <div style="
          background-color: #825995;
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          margin-top: 10px;
          font-weight: 500;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          animation: fadeInOut 2s ease-in-out;
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
