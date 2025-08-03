function currentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}
currentYear();



function initHeaderScrollLogic() {
  const header = document.getElementById('headerBlock');
  const portfolioTitle = document.getElementById('portfolioSection');
  const feedbackBlock = document.getElementById('feedbackSection');

  window.addEventListener('scroll', () => {
    const headerHeight = header.offsetHeight;
    const portfolioTitleTop = portfolioTitle.getBoundingClientRect().top;
    const feedbackTop = feedbackBlock.getBoundingClientRect().top;

    // Чёрный хедер — когда "Portfolio" касается верха окна (учитывая высоту хедера)
    if (portfolioTitleTop <= headerHeight) {
      header.classList.add('dark');
    } else {
      header.classList.remove('dark');
    }

    // Отключить sticky — когда feedback доходит до верха окна
    if (feedbackTop <= headerHeight) {
      header.classList.add('static');
    } else {
      header.classList.remove('static');
    }
  });
}

document.addEventListener('DOMContentLoaded', initHeaderScrollLogic);


function form() {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const statusMessage = document.getElementById("statusMessage");
        const submitBtn = document.querySelector('.submitBtn');
        const formInputs = document.querySelectorAll('.formInput');
        
        formInputs.forEach(formInput => formInput.disabled = true);
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const response = await fetch("https://formsubmit.co/paytyaneric@gmail.com", {
                method: "POST",
                body: formData
            });
            
            
            if (response.ok) {
                statusMessage.style.display = "block"; 
                form.reset(); 

                setTimeout(() => {
                    statusMessage.style.display = 'none';
                }, 5000)
            } else {
                alert("Error sending. Please try again.");
            }
        } catch (error) {
            alert("Connection error!");
        } finally {
            formInputs.forEach(formInput => formInput.disabled = false);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    })
}

form();