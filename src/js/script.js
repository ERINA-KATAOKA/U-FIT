
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

// ヘッダーの高さ分だけコンテンツを下げる
$(function () {
  var height = $(".js-header").height();
  $("main").css("margin-top", height);
});
// ページ内スクロール
$(function () {
  // ヘッダーの高さ取得
  const headerHeight = $(".js-header").height();
  $('a[href^="#"]').click(function () {
    const speed = 600;
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? "html" : href);
    // ヘッダーの高さ分下げる
    let position = target.offset().top - headerHeight;
    $("body,html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});

// ハンバーガーメニュー
$(".js-hamburger").click(function () {//ボタンがクリックされたら
  // $(this).toggleClass('is-active');//ボタン自身に activeクラスを付与し
    $(".js-drawer").toggleClass('is-active');//ナビゲーションにpanelactiveクラスを付与
});
$(".js-drawer, .js-drawer a").click(function () {//ナビゲーションのリンクがクリックされたら
    // $(".js-hamburger").removeClass('is-active');//ボタンの activeクラスを除去し
    $(".js-drawer").removeClass('is-active');//ナビゲーションのpanelactiveクラスも除去
});

// スライダー
const swiper = new Swiper(".swiper", {
  loop: true, // ループ有効
  slidesPerView: "auto", // 一度に表示する枚数
  spaceBetween: 18, // スライド間の距離
  centeredSlides: true, // アクティブなスライドを中央にする
  speed: 6000, // ループの時間
  allowTouchMove: false, // スワイプ無効
  autoplay: {
      delay: 0, // 途切れなくループ
    },
    breakpoints: {
      // スライドの表示枚数：768px以上の場合
      768: {
        spaceBetween: 40, // スライド間の距離
    }
  }
});

// アコーディオン
$(function () {
  // 最初のコンテンツは表示
  $(".accordion__item:first-of-type .accordion__content").css(
    "display",
    "block"
  );
  // 最初の矢印は開いた時の状態に
  $(".accordion__item:first-of-type .js-accordion").addClass("is-open");
  // タイトルをクリックすると
  $(".js-accordion").on("click", function () {
    // クリックしたタイトル以外のopenクラスを外す
    $(".js-accordion").not(this).removeClass("is-open");
    // クリックしたタイトル以外のコンテンツを閉じる
    $(".js-accordion").not(this).next().slideUp(300);
    // クリックしたタイトルにopenクラスを付け外しして矢印を切り替える
    $(this).toggleClass("is-open");
    // クリックしたタイトルの次の要素(コンテンツ)を開閉
    $(this).next().slideToggle(300);
  });
});

});

// セレクトボックスの色変更
function Color(change){
  if( change.value == 0 ){
      change.style.color = '';
  }else{
      change.style.color = 'inherit';
  }
}

// document.addEventListener('DOMContentLoaded',function(){
//   gsap.fromTo('.parallax__img',{y:0},{y:-200,scrollTrigger:{
//     trigger:'.parallax',
//     start:'top bottom',
//     end:'bottom 100px',
//     endTrigger:'.parallax',
//     scrub:.5,
//     markers:{
//       startColor:'white',
//       endColor:'black',
//     }
//   }});
// });