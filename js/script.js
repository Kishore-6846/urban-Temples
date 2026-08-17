
(() => {
  const body = document.body;
  const currentPage = body.dataset.page;
  const nav = document.querySelector('.primary-nav');
  const toggle = document.querySelector('.menu-toggle');
  if(toggle && nav){
    toggle.addEventListener('click',()=>{
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true':'false');
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false');
    }));
  }
  if(nav && currentPage){
    nav.querySelectorAll('[data-page]').forEach(link=>{
      if(link.dataset.page===currentPage) link.classList.add('active');
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})
    },{threshold:.12});
    reveals.forEach(el=>io.observe(el));
  }else{reveals.forEach(el=>el.classList.add('visible'))}

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");

    if (window.scrollY > 10) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

  // Contact form validation / mailto fallback
  const form=document.getElementById('enquiry-form');
  if(form){
    const params=new URLSearchParams(location.search);
    const interest=params.get('interest');
    const interestEl=form.querySelector('[name="interest"]');
    if(interest && interestEl){interestEl.value=interest}
    form.addEventListener('submit',(event)=>{
      event.preventDefault();
      const status=form.querySelector('.form-status');
      const data=new FormData(form);
      const name=(data.get('name')||'').trim();
      const phone=(data.get('phone')||'').trim();
      const email=(data.get('email')||'').trim();
      const interest=(data.get('interest')||'').trim();
      const message=(data.get('message')||'').trim();
      const location=(data.get('location')||'').trim();
      if(!name || !phone || !email || !interest || !message){status.textContent='Please complete all required fields.';status.style.color='#9c1616';return}
      const emailOk=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const phoneOk=/^[+]?[-\s\d()]{10,}$/.test(phone);
      if(!emailOk){status.textContent='Please enter a valid email address.';status.style.color='#9c1616';return}
      if(!phoneOk){status.textContent='Please enter a valid phone number.';status.style.color='#9c1616';return}
      status.textContent='Preparing your enquiry…';status.style.color='#8c6500';
      const subject=encodeURIComponent(`Website Enquiry — ${interest}`);
      const bodyTxt=encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nInterested In: ${interest}\nPreferred Location: ${location||'Not specified'}\n\nRequirement:\n${message}`);
      window.setTimeout(()=>{
        window.location.href=`mailto:info@urbantemples.in?subject=${subject}&body=${bodyTxt}`;
        status.textContent='Your email app is being opened with the enquiry details.';status.style.color='#6b4d00';
      },450);
    });
  }

  // Gallery lightbox
  const triggers=[...document.querySelectorAll('.gallery-trigger')];
  const box=document.querySelector('.lightbox');
  if(box && triggers.length){
    const img=box.querySelector('figure img'); const cap=box.querySelector('figcaption');
    let index=0;
    const open=(i)=>{index=i;const t=triggers[index];img.src=t.dataset.gallery;img.alt=t.dataset.title;cap.textContent=t.dataset.title;box.classList.add('open');box.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
    const close=()=>{box.classList.remove('open');box.setAttribute('aria-hidden','true');document.body.style.overflow=''};
    const step=(dir)=>open((index+dir+triggers.length)%triggers.length);
    triggers.forEach((t,i)=>t.addEventListener('click',()=>open(i)));
    box.querySelector('.lightbox-close').addEventListener('click',close);
    box.querySelector('.lightbox-backdrop').addEventListener('click',close);
    box.querySelector('.lightbox-prev').addEventListener('click',()=>step(-1));
    box.querySelector('.lightbox-next').addEventListener('click',()=>step(1));
    document.addEventListener('keydown',e=>{if(!box.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
  }
})();






















/* =========================================
   AUTO OPEN ENQUIRY MODAL
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const enquiryModal = document.getElementById("enquiryModal");
    const closeEnquiry = document.getElementById("closeEnquiry");
    const enquiryBackdrop =
        enquiryModal?.querySelector(".enquiry-backdrop");

    if (!enquiryModal) return;


    function openEnquiry() {

        enquiryModal.classList.add("open");

        enquiryModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("enquiry-open");

        setTimeout(() => {
            document.getElementById("enquiryName")?.focus();
        }, 150);
    }


    function closeEnquiryModal() {

        enquiryModal.classList.remove("open");

        enquiryModal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("enquiry-open");
    }


    /* OPEN AUTOMATICALLY */

    setTimeout(() => {
        openEnquiry();
    }, 500);


    /* CLOSE BUTTON */

    closeEnquiry?.addEventListener(
        "click",
        closeEnquiryModal
    );


    /* CLICK BACKDROP */

    enquiryBackdrop?.addEventListener(
        "click",
        closeEnquiryModal
    );


    /* ESC KEY */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            enquiryModal.classList.contains("open")
        ) {
            closeEnquiryModal();
        }

    });


    /* FORM */

    const form =
        document.getElementById("homeEnquiryForm");

    form?.addEventListener("submit", function (event) {

        event.preventDefault();

        // Connect this later to Formspree/Web3Forms.
        alert("Thank you. Your enquiry has been received.");

        form.reset();

        closeEnquiryModal();
    });

});
