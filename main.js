// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Global function for showing sections
function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    // すべてのセクションを非表示にする
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    // 指定されたセクションを表示する
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section activated:', sectionId);
    } else {
        console.error('Target section not found:', sectionId);
    }
}

// スクロールアニメーション
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.75);
        
        if (isVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// 初期設定
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // セクションのアニメーション設定
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease-in-out';
    });

    // メニュー機能の設定
    const menuButton = document.querySelector('.menu-button');
    const modalMenu = document.querySelector('.modal-menu');
    const closeButton = document.querySelector('.close-button');
    
    console.log('Menu Button:', menuButton);
    console.log('Modal Menu:', modalMenu);

    if (menuButton && modalMenu) {
        // 修正: モーダルメニューのクリックイベントを元に戻す
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            modalMenu.classList.add('active');
            menuButton.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // スクロールを防止
        });

        // 閉じるボタンのクリックイベント
        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                modalMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // スクロールを再開
            });
        }

        // 修正: モーダルメニューの外側をクリックしたら閉じる
        modalMenu.addEventListener('click', function(e) {
            if (e.target === modalMenu) {
                modalMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // スクロールを再開
            }
        });

        // モーダル内のナビゲーションカードのクリックイベント
        const modalNavCards = modalMenu.querySelectorAll('.nav-card');
        modalNavCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const sectionId = this.getAttribute('data-section');
                showSection(sectionId);
                modalMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // スクロールを再開
            });
        });
    } else {
        console.error('Menu elements not found');
    }

    // 初期セクションの表示
    const initialSection = document.querySelector('.section.active');
    if (!initialSection) {
        showSection('home');
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // ここでフォームの送信処理を実装
    console.log('Form submitted:', { name, email, message });
    
    // フォームをリセット
    this.reset();
    alert('メッセージを送信しました！');
});
