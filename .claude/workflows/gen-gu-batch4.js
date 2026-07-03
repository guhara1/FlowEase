export const meta = {
  name: 'gen-gu-batch4',
  description: '부천 3구 + 인천 9구 페이지용 2,000자급 고유 콘텐츠 생성 (전량 index 전환용)',
  phases: [{ title: 'Generate', detail: '구 단위 콘텐츠 생성' }],
}

const SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    meta_desc: { type: 'string', description: '80자 이내(공백 포함), "<구> 출장마사지" 자연 포함' },
    hero_sub: { type: 'string' },
    overview: { type: 'string', description: '구 개요 350~450자' },
    living: { type: 'string', description: '구 내 생활권 구조(동별 성격) 400~500자' },
    transport: { type: 'string', description: '가까운 역·광역교통 300~400자' },
    venues: { type: 'string', description: '이용 장소별 기준(건물 유형별 출입) 550~700자' },
    tips: { type: 'string', description: '방문 시 참고·시간대·주차 팁 500~650자' },
    checklist: { type: 'array', items: { type: 'string' }, minItems: 4, maxItems: 4 },
    faqs: { type: 'array', minItems: 3, maxItems: 3,
      items: { type: 'object', additionalProperties: false, required: ['q','a'],
        properties: { q: { type: 'string' }, a: { type: 'string' } } } },
    who: { type: 'string' }, how: { type: 'string' }, why: { type: 'string' },
  },
  required: ['meta_desc','hero_sub','overview','living','transport','venues','tips','checklist','faqs','who','how','why'],
}

const SPECS = [
  {city:'bucheon',name:'원미구',slug:'wonmi-gu',hint:'부천시청·현대백화점·신중동역 상권 중심. 중동·상동·신중동 오피스텔/주상복합, 심곡·원미 원도심, 춘의 테크노파크, 도당 북부, 약대 아파트, 역곡 대학가'},
  {city:'bucheon',name:'소사구',slug:'sosa-gu',hint:'소사역·송내역 1호선/서해선. 소사본·심곡본 원도심, 송내 환승상권, 범박·옥길 신도시 아파트, 괴안 주택가. 서울 구로·시흥 접경'},
  {city:'bucheon',name:'오정구',slug:'ojeong-gu',hint:'김포공항·서울 강서 인접 북부. 원종·고강 주택가, 오정 산업단지, 성곡, 여월지구. 차량 이동 비중 높음'},
  {city:'incheon',name:'연수구',slug:'yeonsu-gu',hint:'송도국제도시(국제업무지구·호텔·레지던스·컨벤시아), 연수·동춘·청학 아파트 주거, 옥련·선학. 인천1호선·수인분당선'},
  {city:'incheon',name:'남동구',slug:'namdong-gu',hint:'구월(인천시청·로데오)·간석·만수 주거, 논현·소래포구 택지, 서창지구, 남동국가산업단지. 인천1·2호선·수인분당선'},
  {city:'incheon',name:'부평구',slug:'bupyeong-gu',hint:'부평역(1호선·인천1호선 환승)·부평시장·지하상가, 부개·삼산(부천 접경)·산곡·청천·십정. 오피스텔·상권 밀집'},
  {city:'incheon',name:'계양구',slug:'gyeyang-gu',hint:'계산·작전 상권/주거, 경인교대, 임학·효성, 계양신도시 예정. 인천1호선, 김포공항 인접'},
  {city:'incheon',name:'미추홀구',slug:'michuhol-gu',hint:'주안역 상권·용현(인하대)·학익(법조타운)·도화·숭의·관교(인천터미널). 원도심·대학가·재개발 혼재'},
  {city:'incheon',name:'서해구',slug:'seohae-gu',hint:'청라국제도시(호수공원·업무지구), 가정 루원시티, 석남·가좌, 검암(공항철도)·연희. 신도시+원도심 혼재'},
  {city:'incheon',name:'검단구',slug:'geomdan-gu',hint:'검단신도시(원당·당하·마전·불로) 신축 대단지 아파트 중심, 검단 원도심. 인천1호선 연장'},
  {city:'incheon',name:'영종구',slug:'yeongjong-gu',hint:'인천공항 배후. 영종하늘도시·운서 공항신도시·중산·운남. 호텔·장기숙소, 공항철도·공항고속도로 차량 이동'},
  {city:'incheon',name:'제물포구',slug:'jemulpo-gu',hint:'개항장·신포국제시장 원도심 상권, 신흥·송림·화수·만석 항만 인접. 동인천역·인천역'},
]

function prompt(s) {
  const cityKo = s.city==='bucheon' ? '경기 부천시' : '인천광역시'
  return [
    `당신은 '간다GO' 출장마사지·홈타이 지역 안내 사이트의 지역 콘텐츠 작성자입니다.`,
    `대상 지역: ${cityKo} ${s.name} (구 단위 안내 페이지). 구 특성 힌트: ${s.hint}.`,
    `이 구의 실제 생활권 구조(어떤 동이 어떤 성격인지), 교통 축, 대표 랜드마크를 정확히 반영해 필드를 한국어로 충분히 길고 구체적으로 작성하세요.`,
    `규칙:`,
    `- 방문형 서비스 안내이며 실제 오프라인 매장이 아님. 매장 주소/영업시간/리뷰/평점 언급 금지.`,
    `- 선정적·불법 표현 금지. '1위/최저가/추천/보장' 등 과장·순위 표현 금지.`,
    `- 지역명 나열·반복 금지(도어웨이 금지). 동별 성격 차이를 실제로 설명해 차별화.`,
    `- 오피스텔·아파트·원룸·다세대·호텔/숙소 등 건물 유형별 출입 기준(공동현관·엘리베이터·방문 등록·주차·야간 출입)과 예약 전 확인을 자연스럽게 포함.`,
    `- 확실치 않은 특정 사실은 지어내지 말고 일반적 생활권 성격으로 서술.`,
    `분량(중요): overview 350~450자, living 400~500자, transport 300~400자, venues 550~700자, tips 500~650자.`,
    `overview+living+transport+venues+tips 합계가 공백 포함 2400자 이상(부족 금지).`,
    `meta_desc는 공백 포함 80자 이내로 "${s.name} 출장마사지" 자연 포함. checklist 4개, faqs 3개(첫 질문은 구 특성 관련), who/how/why 각 40~70자.`,
  ].join('\n')
}

phase('Generate')
log(`구 페이지 ${SPECS.length}곳 콘텐츠 생성 시작`)
const results = await parallel(SPECS.map((s) => () =>
  agent(prompt(s), { schema: SCHEMA, label: `gu:${s.slug}`, phase: 'Generate' })
    .then(c => (c ? { spec: s, content: c } : null))
))
const ok = results.filter(Boolean)
log(`생성 완료: ${ok.length}/${SPECS.length}`)
return ok
