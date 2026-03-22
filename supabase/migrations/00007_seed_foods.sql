-- Seed data: popular cat food products in Japan
-- Uses ON CONFLICT to allow re-running without duplicates

-- ============================================================
-- ロイヤルカナン
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ロイヤルカナン', 'インドア 成猫用', 'dry', 'adult', 375, true, NULL),
  ('ロイヤルカナン', 'キトン 子猫用', 'dry', 'kitten', 406, true, NULL),
  ('ロイヤルカナン', 'エイジング12+ 高齢猫用', 'dry', 'senior', 363, true, NULL),
  ('ロイヤルカナン', 'フィット 適正体重の成猫用', 'dry', 'adult', 381, true, NULL),
  ('ロイヤルカナン', 'センシブル 胃腸が敏感な成猫用', 'dry', 'adult', 388, true, NULL),
  ('ロイヤルカナン', 'オーラル ケア 歯の健康が気になる成猫用', 'dry', 'adult', 391, true, NULL),
  ('ロイヤルカナン', 'ヘアー&スキン ケア 被毛の健康が気になる成猫用', 'dry', 'adult', 395, true, NULL),
  ('ロイヤルカナン', 'ステアライズド 適正体重の維持が難しい成猫用', 'dry', 'adult', 342, true, NULL),
  ('ロイヤルカナン', 'インドア 7+ 室内で生活する中高齢猫用', 'dry', 'senior', 355, true, NULL),
  ('ロイヤルカナン', 'ユリナリー ケア 健康な尿を維持したい成猫用', 'dry', 'adult', 374, true, NULL),
  ('ロイヤルカナン', 'マザー&ベビーキャット 母猫・子猫用', 'dry', 'kitten', 414, true, NULL),
  ('ロイヤルカナン', 'アペタイト コントロール おねだりの多い成猫用', 'dry', 'adult', 345, true, NULL),
  ('ロイヤルカナン', 'インドア 成猫用 ウェット ローフ', 'wet', 'adult', 92, true, NULL),
  ('ロイヤルカナン', 'キトン ウェット ローフ 子猫用', 'wet', 'kitten', 100, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- ピュリナワン
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ピュリナワン', '室内飼い猫用 インドアキャット ターキー&チキン', 'dry', 'adult', 365, true, NULL),
  ('ピュリナワン', '美味を求める成猫用 チキン', 'dry', 'adult', 370, true, NULL),
  ('ピュリナワン', '子ねこ用 チキン', 'dry', 'kitten', 400, true, NULL),
  ('ピュリナワン', '優しく腎臓の健康サポート 11歳以上 チキン', 'dry', 'senior', 355, true, NULL),
  ('ピュリナワン', 'メタボリック エネルギーコントロール ターキー', 'dry', 'adult', 340, true, NULL),
  ('ピュリナワン', '下部尿路の健康維持 F.L.U.T.H.ケア チキン', 'dry', 'adult', 360, true, NULL),
  ('ピュリナワン', '避妊・去勢した猫の体重ケア ターキー', 'dry', 'adult', 335, true, NULL),
  ('ピュリナワン', 'グレインフリー 白身魚', 'dry', 'adult', 375, true, NULL),
  ('ピュリナワン', '避妊・去勢した猫の体重ケア', 'dry', 'adult', 340, true, NULL),
  ('ピュリナワン', 'メタボリックエネルギーコントロール', 'dry', 'adult', 335, true, NULL),
  ('ピュリナワン', 'パウチ 成猫用 チキン グレービー仕立て', 'wet', 'adult', 75, true, NULL),
  ('ピュリナワン', 'パウチ 子ねこ用 チキン グレービー仕立て', 'wet', 'kitten', 85, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- ヒルズ サイエンスダイエット
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ヒルズ サイエンスダイエット', 'インドアキャット アダルト チキン', 'dry', 'adult', 363, true, NULL),
  ('ヒルズ サイエンスダイエット', 'キトン チキン 子猫用', 'dry', 'kitten', 410, true, NULL),
  ('ヒルズ サイエンスダイエット', 'シニア チキン 7歳以上', 'dry', 'senior', 358, true, NULL),
  ('ヒルズ サイエンスダイエット', 'シニアプラス チキン 11歳以上', 'dry', 'senior', 371, true, NULL),
  ('ヒルズ サイエンスダイエット', 'アダルト まぐろ', 'dry', 'adult', 368, true, NULL),
  ('ヒルズ サイエンスダイエット', 'アダルト ライト チキン 肥満傾向の成猫用', 'dry', 'adult', 331, true, NULL),
  ('ヒルズ サイエンスダイエット', '避妊・去勢猫用 まぐろ', 'dry', 'adult', 344, true, NULL),
  ('ヒルズ サイエンスダイエット', 'アダルト 缶 チキン', 'wet', 'adult', 85, true, NULL),
  ('ヒルズ サイエンスダイエット', 'キトン 缶 レバー&チキン 子猫用', 'wet', 'kitten', 90, true, NULL),
  ('ヒルズ サイエンスダイエット', 'シニア 缶 チキン 7歳以上', 'wet', 'senior', 78, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- ニュートロ ナチュラルチョイス
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ニュートロ ナチュラルチョイス', '室内猫用 アダルト チキン', 'dry', 'adult', 370, true, NULL),
  ('ニュートロ ナチュラルチョイス', '室内猫用 キトン チキン', 'dry', 'kitten', 390, true, NULL),
  ('ニュートロ ナチュラルチョイス', '室内猫用 アダルト サーモン', 'dry', 'adult', 365, true, NULL),
  ('ニュートロ ナチュラルチョイス', '穀物フリー アダルト ダック', 'dry', 'adult', 380, true, NULL),
  ('ニュートロ ナチュラルチョイス', '室内猫用 シニア チキン', 'dry', 'senior', 355, true, NULL),
  ('ニュートロ ナチュラルチョイス', '食にこだわる猫用 アダルト チキン', 'dry', 'adult', 375, true, NULL),
  ('ニュートロ ナチュラルチョイス', '室内猫用 アダルト ターキー', 'dry', 'adult', 368, true, NULL),
  ('ニュートロ ナチュラルチョイス', '穀物フリー アダルト サーモン', 'dry', 'adult', 378, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- モンプチ
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('モンプチ', 'ゴールド缶 極上まぐろ', 'wet', 'all_ages', 48, true, NULL),
  ('モンプチ', 'ゴールド缶 極上かつお', 'wet', 'all_ages', 50, true, NULL),
  ('モンプチ', 'ゴールド缶 極上ささみ', 'wet', 'all_ages', 45, true, NULL),
  ('モンプチ', 'プチリュクス パウチ まぐろのささみ添え', 'wet', 'all_ages', 55, true, NULL),
  ('モンプチ', 'プチリュクス パウチ かつおのしらす添え', 'wet', 'all_ages', 52, true, NULL),
  ('モンプチ', 'プチリュクス パウチ まぐろとたい', 'wet', 'all_ages', 50, true, NULL),
  ('モンプチ', '缶 あらほぐし仕立て ロースト牛肉', 'wet', 'all_ages', 78, true, NULL),
  ('モンプチ', '缶 あらほぐし仕立て まぐろのグリル', 'wet', 'all_ages', 60, true, NULL),
  ('モンプチ', 'ボックス 4つのうれしい贅沢バラエティ', 'dry', 'adult', 370, true, NULL),
  ('モンプチ', 'ナチュラル グレインフリー 白身魚の贅沢', 'dry', 'adult', 365, true, NULL),
  ('モンプチ', 'クリスピーキッス チーズ&チキンセレクト', 'treat', 'all_ages', 390, true, NULL),
  ('モンプチ', 'クリスピーキッス シーフードセレクト', 'treat', 'all_ages', 385, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- チャオ
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('チャオ', 'ちゅ〜る まぐろ', 'treat', 'all_ages', 7, true, NULL),
  ('チャオ', 'ちゅ〜る とりささみ', 'treat', 'all_ages', 7, true, NULL),
  ('チャオ', 'ちゅ〜る かつお', 'treat', 'all_ages', 7, true, NULL),
  ('チャオ', 'ちゅ〜る 総合栄養食 まぐろ', 'treat', 'all_ages', 10, true, NULL),
  ('チャオ', 'ちゅ〜る 総合栄養食 とりささみ', 'treat', 'all_ages', 10, true, NULL),
  ('チャオ', 'ちゅ〜る 水分補給 まぐろ', 'treat', 'all_ages', 5, true, NULL),
  ('チャオ', 'ちゅ〜る 11歳からの まぐろ', 'treat', 'senior', 7, true, NULL),
  ('チャオ', 'ちゅ〜る 子ねこ用 まぐろ', 'treat', 'kitten', 8, true, NULL),
  ('チャオ', '缶 まぐろ&とりささみ', 'wet', 'all_ages', 45, true, NULL),
  ('チャオ', '缶 とりささみ&甘えび', 'wet', 'all_ages', 42, true, NULL),
  ('チャオ', 'パウチ まぐろ ささみ入り ほたて味', 'wet', 'all_ages', 40, true, NULL),
  ('チャオ', 'パウチ とりささみ かつお節味', 'wet', 'all_ages', 38, true, NULL),
  ('チャオ', '焼かつお 本格かつお味', 'treat', 'all_ages', 50, true, NULL),
  ('チャオ', 'ちゅ〜る グルメ 本格かつおだし', 'treat', 'all_ages', 7, true, NULL),
  ('チャオ', '缶 かつお&おかか(かつお節)', 'wet', 'all_ages', 48, true, NULL),
  ('チャオ', 'ちゅ〜る 毛玉配慮 まぐろ', 'treat', 'all_ages', 7, true, NULL),
  ('チャオ', 'ちゅ〜る 下部尿路配慮 まぐろ', 'treat', 'adult', 7, true, NULL),
  ('チャオ', '焼かつお 本格ほたて味', 'treat', 'all_ages', 48, true, NULL),
  ('チャオ', '焼ささみ 本格かつお節味', 'treat', 'all_ages', 45, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- いなば
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('いなば', '金のだし カップ まぐろ', 'wet', 'all_ages', 55, true, NULL),
  ('いなば', '金のだし カップ かつお', 'wet', 'all_ages', 52, true, NULL),
  ('いなば', 'とびつく ささみ', 'treat', 'all_ages', 12, true, NULL),
  ('いなば', '焼ささみ 5本入り', 'treat', 'all_ages', 55, true, NULL),
  ('いなば', 'まぐろの贅沢パウチ まぐろ細切り', 'wet', 'all_ages', 42, true, NULL),
  ('いなば', '贅沢 まぐろまるごとフレーク', 'wet', 'all_ages', 58, true, NULL),
  ('いなば', '前浜の魚 かつお丸つぶし', 'wet', 'all_ages', 65, true, NULL),
  ('いなば', '低脂肪 とりささみ&温野菜', 'wet', 'adult', 35, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- カルカン
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('カルカン', 'ドライ かつおと野菜味 ミックス', 'dry', 'adult', 355, true, NULL),
  ('カルカン', 'ドライ まぐろと野菜味', 'dry', 'adult', 350, true, NULL),
  ('カルカン', 'ドライ 子ねこ用 かつおと野菜味ミルク粒入り', 'dry', 'kitten', 385, true, NULL),
  ('カルカン', 'ドライ 15歳から用 かつおと野菜味', 'dry', 'senior', 340, true, NULL),
  ('カルカン', 'パウチ まぐろ', 'wet', 'adult', 52, true, NULL),
  ('カルカン', 'パウチ お魚ミックス まぐろ・かつお・たい入り', 'wet', 'adult', 55, true, NULL),
  ('カルカン', 'パウチ まぐろ 子ねこ用', 'wet', 'kitten', 60, true, NULL),
  ('カルカン', 'パウチ ささみ入りまぐろ 15歳から用', 'wet', 'senior', 48, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- 銀のスプーン
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('銀のスプーン', '贅沢うまみ仕立て お魚づくし', 'dry', 'adult', 360, true, NULL),
  ('銀のスプーン', '贅沢うまみ仕立て 10歳頃から お魚づくし', 'dry', 'senior', 350, true, NULL),
  ('銀のスプーン', 'パウチ まぐろ', 'wet', 'adult', 50, true, NULL),
  ('銀のスプーン', 'パウチ ささみ入りまぐろ 13歳頃から', 'wet', 'senior', 45, true, NULL),
  ('銀のスプーン', 'まぐろ・かつお・白身魚味', 'dry', 'all_ages', 370, true, NULL),
  ('銀のスプーン', '贅沢うまみ仕立て 食事の吐き戻し軽減フード', 'dry', 'adult', 365, true, NULL),
  ('銀のスプーン', '三ツ星グルメ パウチ まぐろ入りかつお', 'wet', 'all_ages', 48, true, NULL),
  ('銀のスプーン', 'パウチ ささみ', 'wet', 'adult', 50, true, NULL),
  ('銀のスプーン', 'おやつ しあわせスナック まぐろ味', 'treat', 'all_ages', 350, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- シーバ
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('シーバ', 'デュオ 鶏ささみ味と海のセレクション', 'dry', 'adult', 375, true, NULL),
  ('シーバ', 'デュオ 魚介とお肉のチーズ味セレクション', 'dry', 'adult', 380, true, NULL),
  ('シーバ', 'デュオ 15歳以上 鶏ささみ味と海のセレクション', 'dry', 'senior', 365, true, NULL),
  ('シーバ', 'アミューズ お魚の贅沢スープ まぐろ、かつお節添え', 'wet', 'all_ages', 15, true, NULL),
  ('シーバ', 'リッチ ごちそうフレーク まぐろ味', 'wet', 'all_ages', 60, true, NULL),
  ('シーバ', 'リッチ ごちそうフレーク 鶏ささみ味', 'wet', 'all_ages', 58, true, NULL),
  ('シーバ', 'とろ〜りメルティ まぐろ味', 'treat', 'all_ages', 8, true, NULL),
  ('シーバ', 'とろ〜りメルティ かつお味', 'treat', 'all_ages', 8, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- アイムス
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('アイムス', '成猫用 体重管理用 まぐろ味', 'dry', 'adult', 345, true, NULL),
  ('アイムス', '成猫用 インドアキャット チキン', 'dry', 'adult', 360, true, NULL),
  ('アイムス', '子猫用 チキン', 'dry', 'kitten', 395, true, NULL),
  ('アイムス', '7歳以上用 インドアキャット チキン', 'dry', 'senior', 350, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- メディファス
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('メディファス', '室内猫 毛玉ケアプラス 1歳から チキン&フィッシュ味', 'dry', 'adult', 355, true, NULL),
  ('メディファス', '子ねこ 12か月まで チキン味', 'dry', 'kitten', 390, true, NULL),
  ('メディファス', '避妊・去勢後のケア チキン&フィッシュ味', 'dry', 'adult', 340, true, NULL),
  ('メディファス', '7歳から チキン&フィッシュ味', 'dry', 'senior', 350, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- ファーストチョイス
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ファーストチョイス', '成猫 1歳以上 室内猫用 サーモン&白身魚', 'dry', 'adult', 365, true, NULL),
  ('ファーストチョイス', '成猫 1歳以上 室内猫用 チキン', 'dry', 'adult', 360, true, NULL),
  ('ファーストチョイス', '子ねこ 2か月から1歳まで チキン', 'dry', 'kitten', 400, true, NULL),
  ('ファーストチョイス', '高齢猫 10歳以上 室内猫用 チキン', 'dry', 'senior', 345, true, NULL),
  ('ファーストチョイス', '成猫 1歳以上 下部尿路の健康維持 チキン', 'dry', 'adult', 355, true, NULL),
  ('ファーストチョイス', '成猫 1歳以上 体重が気になる猫用 チキン', 'dry', 'adult', 340, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- ジェーピースタイル
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ジェーピースタイル', '和の究み 1歳から 飽きやすい成猫用', 'dry', 'adult', 360, true, NULL),
  ('ジェーピースタイル', '和の究み 子ねこ用', 'dry', 'kitten', 395, true, NULL),
  ('ジェーピースタイル', '和の究み 11歳以上のシニア猫用', 'dry', 'senior', 350, true, NULL),
  ('ジェーピースタイル', '和の究み 1歳から 下部尿路の健康維持サポート', 'dry', 'adult', 355, true, NULL),
  ('ジェーピースタイル', '和の究み 1歳から 避妊・去勢後の猫用', 'dry', 'adult', 340, true, NULL),
  ('ジェーピースタイル', '和の究み 15歳から 長生き猫用', 'dry', 'senior', 345, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- ピュリナ プロプラン
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ピュリナ プロプラン', '成猫用 室内飼い猫用 チキン', 'dry', 'adult', 382, true, NULL),
  ('ピュリナ プロプラン', '子猫用 チキン', 'dry', 'kitten', 415, true, NULL),
  ('ピュリナ プロプラン', '成猫用 サーモン', 'dry', 'adult', 385, true, NULL),
  ('ピュリナ プロプラン', '7歳以上 室内飼い猫用 チキン', 'dry', 'senior', 365, true, NULL),
  ('ピュリナ プロプラン', '成猫用 体重管理用 チキン', 'dry', 'adult', 348, true, NULL),
  ('ピュリナ プロプラン', '成猫用 皮膚・被毛の健康維持 サーモン', 'dry', 'adult', 390, true, NULL),
  ('ピュリナ プロプラン', '成猫用 デリケートなお腹の健康維持 ターキー', 'dry', 'adult', 378, true, NULL),
  ('ピュリナ プロプラン', '成猫用 尿路の健康維持 チキン', 'dry', 'adult', 375, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- ウェルネス
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ウェルネス', 'コア 室内猫用 骨抜きチキン', 'dry', 'adult', 388, true, NULL),
  ('ウェルネス', 'コア 子猫用 骨抜きターキー', 'dry', 'kitten', 406, true, NULL),
  ('ウェルネス', 'コア 成猫用 オリジナル', 'dry', 'adult', 392, true, NULL),
  ('ウェルネス', 'コア 成猫用 サーモン&ニシン', 'dry', 'adult', 395, true, NULL),
  ('ウェルネス', 'コア 室内猫用 缶 チキン&ターキー パテ', 'wet', 'adult', 108, true, NULL),
  ('ウェルネス', 'コア シグネチャーセレクツ フレーク チキン&ターキー', 'wet', 'all_ages', 65, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- オリジン
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('オリジン', 'キャット&キトン', 'dry', 'all_ages', 416, true, NULL),
  ('オリジン', '6フィッシュキャット', 'dry', 'all_ages', 410, true, NULL),
  ('オリジン', 'レジオナルレッドキャット', 'dry', 'all_ages', 414, true, NULL),
  ('オリジン', 'ツンドラキャット', 'dry', 'all_ages', 412, true, NULL),
  ('オリジン', 'フィット&トリム キャット', 'dry', 'adult', 371, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- アカナ
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('アカナ', 'ワイルドプレイリーキャット', 'dry', 'all_ages', 406, true, NULL),
  ('アカナ', 'パシフィカキャット', 'dry', 'all_ages', 398, true, NULL),
  ('アカナ', 'グラスランドキャット', 'dry', 'all_ages', 404, true, NULL),
  ('アカナ', 'インドアエントリーキャット', 'dry', 'adult', 365, true, NULL),
  ('アカナ', 'ホームステッドハーベストキャット', 'dry', 'all_ages', 396, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- ナチュラルバランス
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ナチュラルバランス', 'ウルトラプレミアム 室内猫用 チキンミール&サーモンミール', 'dry', 'adult', 358, true, NULL),
  ('ナチュラルバランス', 'グリーンピー&ダック キャットフード', 'dry', 'all_ages', 368, true, NULL),
  ('ナチュラルバランス', 'リデュースカロリー キャットフード', 'dry', 'adult', 340, true, NULL),
  ('ナチュラルバランス', 'ウルトラプレミアム 缶 室内猫用 チキン', 'wet', 'adult', 95, true, NULL),
  ('ナチュラルバランス', 'グリーンピー&チキン キャットフード', 'dry', 'all_ages', 365, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- 懐石
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('懐石', '2dish 枕崎のかつお節ペア 海のおいしさ', 'dry', 'adult', 355, true, NULL),
  ('懐石', '2dish 瀬戸内のちりめんペア お魚づくし', 'dry', 'adult', 350, true, NULL),
  ('懐石', 'zeppin 5つのごちそう お魚仕立て', 'dry', 'adult', 360, true, NULL),
  ('懐石', '2dish 子ねこ用 まぐろペア', 'dry', 'kitten', 385, true, NULL),
  ('懐石', '2dish 15歳以上用 枕崎のかつお節ペア', 'dry', 'senior', 345, true, NULL),
  ('懐石', 'パウチ まぐろ白身のせ', 'wet', 'all_ages', 50, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- 黒缶
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('黒缶', 'まぐろとかつお まぐろ白身のせ', 'wet', 'all_ages', 75, true, NULL),
  ('黒缶', 'まぐろとかつお', 'wet', 'all_ages', 78, true, NULL),
  ('黒缶', 'まぐろミックス ささみ入りまぐろとかつお', 'wet', 'all_ages', 72, true, NULL),
  ('黒缶', '毎日 かつお', 'wet', 'all_ages', 68, true, NULL),
  ('黒缶', 'パウチ まぐろとかつお', 'wet', 'all_ages', 55, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- 金缶
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('金缶', '芳醇 まぐろ', 'wet', 'all_ages', 85, true, NULL),
  ('金缶', '芳醇 かつお', 'wet', 'all_ages', 82, true, NULL),
  ('金缶', '濃厚とろみ まぐろ', 'wet', 'all_ages', 55, true, NULL),
  ('金缶', 'ミニ まぐろ', 'wet', 'all_ages', 75, true, NULL),
  ('金缶', 'ミニ かつお', 'wet', 'all_ages', 72, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- ミャウミャウ
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ミャウミャウ', 'カリカリ小粒タイプ ミドル まぐろ味', 'dry', 'adult', 360, true, NULL),
  ('ミャウミャウ', 'カリカリ小粒タイプ ミドル かつお味', 'dry', 'adult', 358, true, NULL),
  ('ミャウミャウ', 'ジューシー まぐろ', 'wet', 'all_ages', 50, true, NULL),
  ('ミャウミャウ', 'ジューシー ささみ', 'wet', 'all_ages', 48, true, NULL),
  ('ミャウミャウ', 'クリーミー まぐろ味', 'treat', 'all_ages', 8, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- AllWell
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('AllWell', '室内猫用 フィッシュ味', 'dry', 'adult', 350, true, NULL),
  ('AllWell', '避妊・去勢した猫の体重ケア', 'dry', 'adult', 330, true, NULL),
  ('AllWell', '10歳以上の腎臓の健康維持用', 'dry', 'senior', 350, true, NULL),
  ('AllWell', '子猫用', 'dry', 'kitten', 400, true, NULL),
  ('AllWell', '下部尿路の健康維持用', 'dry', 'adult', 350, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- GRANDS
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('GRANDS', 'チキン', 'dry', 'all_ages', 361, true, NULL),
  ('GRANDS', 'サーモン', 'dry', 'all_ages', 361, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- カナガン
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('カナガン', 'チキン', 'dry', 'all_ages', 405, true, NULL),
  ('カナガン', 'サーモン', 'dry', 'all_ages', 398, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- キャラット
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('キャラット', 'まぐろ仕立ての味わいブレンド', 'dry', 'all_ages', 360, true, NULL),
  ('キャラット', '下部尿路の健康維持', 'dry', 'adult', 355, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- グランデリ
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('グランデリ', '無添加 ささみ', 'treat', 'all_ages', 15, true, NULL),
  ('グランデリ', 'ふりかけ かつお', 'treat', 'all_ages', 20, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- コンボ
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('コンボ', 'まぐろ味・カニチップ・まぐろ節添え', 'dry', 'adult', 370, true, NULL),
  ('コンボ', '毛玉対応 まぐろ味・ささみチップ', 'dry', 'adult', 365, true, NULL),
  ('コンボ', '子ねこ用 ミルクチップ添え', 'dry', 'kitten', 400, true, NULL),
  ('コンボ', '肥満が気になる猫用 まぐろ味', 'dry', 'adult', 330, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- セレクトバランス
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('セレクトバランス', 'グレインフリー キトン チキン', 'dry', 'kitten', 390, true, NULL),
  ('セレクトバランス', 'グレインフリー アダルト チキン', 'dry', 'adult', 380, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- ねこ元気
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ねこ元気', 'まぐろ・かつお・白身魚入り', 'dry', 'all_ages', 360, true, NULL),
  ('ねこ元気', '複数ねこ用 まぐろ・かつお味', 'dry', 'all_ages', 360, true, NULL),
  ('ねこ元気', '下部尿路の健康維持 まぐろ味', 'dry', 'adult', 355, true, NULL),
  ('ねこ元気', '15歳以上用 まぐろ・白身魚・かつお味', 'dry', 'senior', 365, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- ビューティープロ
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('ビューティープロ', '成猫用 1歳から フィッシュ味', 'dry', 'adult', 365, true, NULL),
  ('ビューティープロ', '下部尿路の健康維持 1歳から', 'dry', 'adult', 360, true, NULL),
  ('ビューティープロ', '15歳以上 腎臓の健康維持', 'dry', 'senior', 370, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- フィリックス
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('フィリックス', 'やわらかグリル 成猫用 ゼリー仕立て チキン', 'wet', 'adult', 75, true, NULL),
  ('フィリックス', 'やわらかグリル 成猫用 ゼリー仕立て ツナ', 'wet', 'adult', 70, true, NULL),
  ('フィリックス', 'やわらかグリル 子ねこ用 ゼリー仕立て チキン', 'wet', 'kitten', 85, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- モグニャン
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('モグニャン', '白身魚', 'dry', 'all_ages', 379, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- 無一物
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed, created_by)
VALUES
  ('無一物', 'パウチ かつお', 'wet', 'all_ages', 45, true, NULL),
  ('無一物', 'パウチ まぐろ', 'wet', 'all_ages', 50, true, NULL),
  ('無一物', 'パウチ ささみ', 'wet', 'all_ages', 40, true, NULL)
ON CONFLICT (brand, product_name) DO NOTHING;

-- ============================================================
-- その他
-- ============================================================
INSERT INTO foods (brand, product_name, type, target_age, calories_per_100g, is_seed)
VALUES ('その他', 'その他のフード', 'dry', 'all_ages', NULL, true)
ON CONFLICT (brand, product_name) DO NOTHING;
