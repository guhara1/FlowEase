# 간다GO — 시흥·부천·인천 출장마사지 서부 수도권 안내

프리미엄 다크 팔레트 + 오렌지 액센트 기반의 정적 사이트입니다. Pretendard 폰트와
디자인 토큰 시스템을 갖추고 있으며, 모든 페이지에 JSON-LD 스키마가 적용되어 있습니다.

## 요청 반영 내역

- **푸터 오렌지 텔레그램 버튼**: 모든 페이지 푸터에 `웹사이트 제작문의` / `제휴문의`
  오렌지 버튼 2개 + 텔레그램 링크(`data-tg="build" / "partner"`).
- **상호/전화**: 간다GO · 전화예약 `0508-202-4719` (푸터 + 히어로 + `tel:` 자동 링크).
- **디스크립션 80자 이내**: 모든 페이지 `<meta name="description">`를 80자 이하로 작성.
- **스키마(전 페이지 필수)**: Organization, WebSite, WebPage, BreadcrumbList,
  Service(OfferCatalog), FAQPage, ImageObject. **LocalBusiness / Review /
  AggregateRating 미사용** (오프라인 매장 주소 없는 방문형 서비스 기준).
- **디자인 토큰 프리미엄 팔레트 교체 + 컴포넌트 오버레이**:
  `assets/css/tokens.css`(토큰) / `assets/css/style.css`(컴포넌트·오버레이).
- **내부링크 롱테일 강화**: 메인→지역, 지역↔지역 상호링크에 생활권 기반
  롱테일 앵커텍스트 사용(예: "부천 중동·상동 숙소 이용 기준"). "1위/최저가/추천"
  같은 스팸 앵커는 사용하지 않음.

## 텔레그램 링크 교체 (한 곳만 수정)

`assets/js/config.js`의 `telegram.build` / `telegram.partner` 값을 실제
텔레그램 주소로 바꾸면 전 페이지 버튼에 자동 반영됩니다.

```js
telegram: {
  build:   "https://t.me/실제아이디",   // 웹사이트 제작문의
  partner: "https://t.me/실제아이디"     // 제휴문의
}
```

> 현재는 플레이스홀더 `https://t.me/ganda_go`가 들어 있습니다.
> 도메인도 배포 시 `flowease.pages.dev` → 실제 도메인으로 일괄 치환하세요.

## 구조

```
/                         간다GO 메인 (히어로·요금·생활권·FAQ)
/west-metro/              서부 수도권 홈(3대 축·요금·체크리스트·Who/How/Why)
/west-metro/siheung/      시흥 (배곧·정왕·은계, 2,000자+ 유니크 본문)
/west-metro/bucheon/      부천 (중동·상동·송내, 원미·소사·오정구)
/west-metro/incheon/      인천 (송도·부평·구월·청라·검단·영종)
assets/css/tokens.css     디자인 토큰(프리미엄 팔레트)
assets/css/style.css      컴포넌트 + 오버레이
assets/js/config.js       사이트 설정(텔레그램·전화 한 곳 관리)
assets/js/main.js         링크 주입·모바일 내비
robots.txt / sitemap.xml  이미지 사이트맵 포함
```

## 향후 확장 (지시서 기준)

지시서의 8대 생활권·역세권·공항/산단·예약 전 확인 등 100+ 롱테일 페이지는
동일한 토큰/스키마/푸터 패턴으로 단계적 확장이 가능합니다. 각 색인 페이지는
2,000~2,500자 유니크 본문 원칙을 유지하고, 본문 부족 페이지는 noindex로 관리하세요.
```

## 로컬 확인

정적 파일이므로 임의의 정적 서버로 확인합니다.

```bash
python3 -m http.server 8080
# http://localhost:8080/
```
