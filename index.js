let isResizing = false;

const elements = document.querySelectorAll(".textbox");
for (let el of elements) {
  el.addEventListener('mousedown', mouseDown);

  function mouseDown(e) {

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mouseMove(e) {
      if (!isResizing) {
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;
        
        const rect = el.getBoundingClientRect();
        
        /* new */
        const bounds = el.parentElement.getBoundingClientRect();
        const x = Math.min(
          Math.max(bounds.left, rect.left - newX), bounds.right - rect.width
        ),    y = Math.min(
          Math.max(bounds.top, rect.top - newY), bounds.bottom - rect.height
        );
        /**/
        
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        prevX = e.clientX;
        prevY = e.clientY;
      }
    }

    function mouseUp() {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    }
  }
}