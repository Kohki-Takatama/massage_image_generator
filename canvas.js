const container_width = 400;

// 一時的にステージを作成
const tmp_stage = new Konva.Stage({
  container: 'container',
});

const tmp_layer = new Konva.Layer();
tmp_stage.add(tmp_layer);

// テキストの描画
const textbox_mt = 40;
const textbox_mx = 20;
const textarea_my = 20;
const textarea_mx = 20;
const footer_text_mt = 10;
const footer_icon_size = 20;
const footer_icon_mt = 10;

export const generate_image = (text) => {
  // テキストエリアを作成
  const textarea = new Konva.Text({
    x: textbox_mx + textarea_mx,
    y: textbox_mt + textarea_my,
    text: text,
    fontSize: 16,
    fontFamily: 'sans-serif',
    fill: 'black',
    lineHeight: 2,
    align: 'center',
    verticalAlign: 'middle',
    width: container_width - (textbox_mx + textarea_mx) * 2,
  });

  tmp_layer.add(textarea);

  // テキストエリアの高さを取得
  const textarea_height = textarea.height() <= 100 ? 100 : textarea.height();

  // （不要に見えるが）テキストエリアの高さを設定しないと、verticalAlign: 'middle' が動かない
  textarea.height(textarea_height);

  // テキストボックスの高さをテキストエリアに合わせて調整
  const textbox_height = textarea_height + textarea_my * 2;

  // 本物のステージを作成
  const stage = new Konva.Stage({
    container: 'container',
    width: container_width,
    height: textbox_mt + textarea_my * 2 + textbox_height + footer_icon_mt + footer_icon_size + footer_text_mt,
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  // 背景の描画
  const background = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: '#b0e0e6',
  });
  layer.add(background);

  // 丸角の白いボックスの描画
  const textbox = new Konva.Rect({
    x: textbox_mx,
    y: textbox_mt,
    width: stage.width() - textbox_mx * 2,
    height: textbox_height,
    fill: 'white',
    cornerRadius: 10,
  });
  layer.add(textbox);

  // テキストの描画
  layer.add(textarea);

  // フッターアイコンの描画
  const footer_icon_obj = new Image();
  footer_icon_obj.src = 'https://cdn-icons-png.flaticon.com/512/1160/1160358.png';
  footer_icon_obj.onload = function () {
    const footerIcon = new Konva.Image({
      x: stage.width() / 2,
      y: textbox_mt + textarea_my * 2 + textarea_height + footer_icon_mt,
      image: footer_icon_obj,
      width: footer_icon_size,
      height: footer_icon_size,
    });
    footerIcon.offsetX(footerIcon.width() / 2);
    layer.add(footerIcon);
  };

  // フッターテキストの描画
  const footerText = new Konva.Text({
    x: stage.width() / 2,
    y: textbox_mt + textarea_my * 2 + textarea_height + footer_icon_mt + footer_icon_size + footer_text_mt,
    text: 'サービス名',
    fontSize: 14,
    fontFamily: 'sans-serif',
    fill: 'black',
  });
  footerText.offsetX(footerText.width() / 2);
  layer.add(footerText);

  layer.draw();
};
