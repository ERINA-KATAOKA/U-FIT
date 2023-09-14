/* --------------------------------------------
 *  ローディングアニメーション
 * -------------------------------------------- */
// クッキー登録
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
// クッキーを取得
function getCookie(name) {
  const value = "; " + document.cookie;// 全てのクッキーの文字列を取得し、先頭に"; "を追加
  const parts = value.split("; " + name + "=");// クッキーの文字列を分割し、指定された名前の前にある部分と後ろにある部分を配列に格納
  if (parts.length === 2){
      return parts.pop().split(";").shift();// 名前が見つかった場合、その値を取得し返します
  }else{
      return "";// 名前が見つからなかった場合、空の文字列を返します
  }
}
// アニメーション再生
const loadingAnime = document.querySelector('.js-loading');
const body = document.body;
const scrollPosition = window.scrollY;
function playAnimation() {
  if (loadingAnime) { //js-loadingが存在したら
    // スクロールを禁止
    body.style.overflow = 'hidden';
    const openingTL = gsap.timeline();
    openingTL
    .fromTo('.loading__animetion',{autoAlpha:0},{autoAlpha:1,duration:1})
    .to('.js-loading',{autoAlpha:0,duration:1},'+=1')
    .fromTo('.mv__img img',{yPercent:100},{yPercent:0,duration:1.5,ease:'power3.out'},'-=.5')
    .fromTo('.mv__img img',{scale:.5},{scale:1,duration:1.5},'-=.5')
    .fromTo('.mv__img img',{filter:'grayscale(1)'},{filter:'grayscale(0)',duration:1},'<')
    .fromTo('.mv__title-wrapper',{clipPath:'inset(50%)'},{clipPath:'inset(0%)',duration:1,ease:'power4.out'})
    .fromTo('.mv__title-wrapper',{autoAlpha:0},{autoAlpha:1,duration:1.5},'<')
    .fromTo('.header',{yPercent:-100},{yPercent:0,duration:1,ease:'bounce.out'},'<')
    .call(animationComplete); // アニメーション終了時にスクロールを有効にする
  }
}
function animationComplete() {
  // オープニングアニメーションに関わる要素を非表示
  hideAnimation();
  // スクロールを有効にする
  enableScroll();
}
function enableScroll() {
  // スクロールを有効にする
  body.style.overflow = 'auto';
  // スクロール位置を元に戻す（任意の位置にスクロールさせない場合はこの行を削除できます）
  window.scrollTo(0, scrollPosition);
}
// オープニングアニメーションに関わる要素を非表示
function hideAnimation() {
  if (loadingAnime) {
    gsap.set('.js-loading',{autoAlpha:0})
  }
}
// まず最初に読み込まれる所
document.addEventListener("DOMContentLoaded", function() {
  const animationPlayed = getCookie("animationPlayed");
  if (animationPlayed) {
    hideAnimation();
  } else {
    playAnimation();
    setCookie("animationPlayed", "true", 1);
  }
});

/* --------------------------------------------
 *  ページ遷移
 * -------------------------------------------- */
window.addEventListener('load', function() {
  const body = document.querySelector('body');
  body.classList.add('is-active');
});



jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

// ヘッダーの高さ分だけコンテンツを下げる
$(function () {
  var height = $(".js-header").height();
  $("main").css("margin-top", height);
});

$(document).ready(function () {
  // ヘッダーの高さ取得
  const headerHeight = $(".js-header").height();
  // ページ内リンクがクリックされたときの処理
  $('a[href^="#"]').click(function (e) {
    const speed = 700;
    const href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? "html" : href);
    // ヘッダーの高さ分下げる
    const position = target.offset().top - headerHeight;
    // ページ内スクロールアニメーション
    $("body,html").animate({ scrollTop: position }, speed, "swing");
    // ページ遷移をキャンセル
    e.preventDefault();
    // URLにアンカーを追加（ブラウザの履歴に記録される）
    history.pushState(null, null, href);
  });
  // ページ読み込み時にURLのアンカーがある場合の処理
  const hash = window.location.hash;
  if (hash && $(hash).length) {
    const position = $(hash).offset().top - headerHeight;
    $("body,html").animate({ scrollTop: position }, 700, "swing");
  }
});

// // ページ内スクロール
// $(function () {
//   // ヘッダーの高さ取得
//   const headerHeight = $(".js-header").height();
//   $('a[href^="#"]').click(function () {
//     const speed = 700;
//     let href = $(this).attr("href");
//     let target = $(href == "#" || href == "" ? "html" : href);
//     // ヘッダーの高さ分下げる
//     let position = target.offset().top - headerHeight;
//     $("body,html").animate({ scrollTop: position }, speed, "swing");
//     return false;
//   });
// });

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

// パララックス
document.addEventListener('DOMContentLoaded', function() {
  const headerElement = document.querySelector('.js-header'); // ヘッダー要素を選択
  const headerHeight = headerElement.offsetHeight;
  const parallaxElement = document.querySelector('.js-parallax'); // .js-parallax要素を選択

  if (parallaxElement) {
    // .js-parallax要素が存在する場合にのみ実行
    gsap.to('.parallax__img', {
      yPercent: -50,
      scrollTrigger: {
        trigger: '.js-parallax',
        start: 'top bottom',
        end: 'bottom headerHeight', // headerHeightの値を使うために変数を展開
        endTrigger: '.js-parallax',
        scrub: 0.5,
      },
    });
  }
});
