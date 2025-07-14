function showText(message) {
    const textElement = $(`
        <div class="text-white p-3 rounded shadow text-center mb-2"
             style="background-color: #825995;
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 2000;
                    min-width: 250px;">
          ${message}
        </div>
      `);
    $("body").append(textElement);

    // We are using the JQuery fadeOut() function, but first
    // initializing it after 1000ms, then fading it in 400ms.
    // This creates a smoother animation than had we used
    // either one alone
    setTimeout(() => {
      textElement.fadeOut(400, function () {
        $(this).remove();
      });
    }, 1000);
  }
