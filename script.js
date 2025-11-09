// Basic enhancements: active nav, mailto form handling, smooth scrolling
(function(){
  // Active link highlighting
  const links=[...document.querySelectorAll('nav a[href$=".html"]'), ...document.querySelectorAll('nav a[href^="#"]')];
  const page = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a=>{
    if((a.getAttribute('href')||'').endsWith(page)){
      a.setAttribute('aria-current','page');
    }
  });

  // Contact form → mailto (on contact.html)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      const data = new FormData(this);
      const body = [
        'Name: ' + (data.get('name')||''),
        'Email: ' + (data.get('email')||''),
        'Phone: ' + (data.get('phone')||''),
        'Service: ' + (data.get('service')||''),
        '',
        (data.get('message')||'')
      ].join('%0D%0A');
      const mailto = `mailto:staytoncory6@gmail.com?subject=New%20Lead%20from%20Website&body=${body}`;
      window.location.href = mailto;
      const status = document.getElementById('formStatus');
      if(status) status.textContent = 'Opening your email app... If nothing happens, email us directly.';
    });
  }
})();