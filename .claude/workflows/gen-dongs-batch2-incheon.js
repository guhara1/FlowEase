export const meta = {
  name: 'gen-dongs-batch2-incheon',
  description: '인천 9개 구 49개 행정동의 고유 지역 콘텐츠를 병렬 생성',
  phases: [{ title: 'Generate', detail: '인천 행정동별 고유 콘텐츠 생성' }],
}

const SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    meta_desc: { type: 'string', description: '80자 이내(공백 포함), "<동> 출장마사지" 자연 포함' },
    hero_sub: { type: 'string' },
    overview: { type: 'string', description: '지역 개요 300~400자' },
    living: { type: 'string', description: '생활권과 랜드마크 300~400자' },
    transport: { type: 'string', description: '가까운 역·광역교통 250~350자' },
    venues: { type: 'string', description: '이용 장소별 기준 450~600자' },
    tips: { type: 'string', description: '방문 시 자주 있는 상황/이용 팁 400~550자' },
    checklist: { type: 'array', items: { type: 'string' }, minItems: 4, maxItems: 4 },
    faqs: { type: 'array', minItems: 3, maxItems: 3,
      items: { type: 'object', additionalProperties: false, required: ['q','a'],
        properties: { q: { type: 'string' }, a: { type: 'string' } } } },
    who: { type: 'string' }, how: { type: 'string' }, why: { type: 'string' },
  },
  required: ['meta_desc','hero_sub','overview','living','transport','venues','tips','checklist','faqs','who','how','why'],
}

const GU = [
  ['연수구','yeonsu-gu',[
    ['송도동','songdo-dong','송도국제도시 국제업무지구, 호텔·레지던스·오피스텔, 인천대·컨벤시아'],
    ['연수동','yeonsu-dong','연수 대단지 아파트 주거, 원인재역·연수역'],
    ['청학동','cheonghak','청학 주거지, 청학공원·문학산 자락'],
    ['동춘동','dongchun','동춘 주거·상권, 동춘역, 연수구청'],
    ['옥련동','okryeon','옥련 주거, 인천상륙작전기념관·송도유원지 인접'],
    ['선학동','seonhak','선학 주거, 선학역·인천대공원 인접'],
  ]],
  ['남동구','namdong-gu',[
    ['구월동','guwol','구월동 상권·인천시청·로데오거리, 인천 최대 번화가'],
    ['간석동','ganseok','간석 주거·상권, 간석오거리역·동암역'],
    ['만수동','mansu','만수 대단지 아파트 주거, 만수역'],
    ['논현동','nonhyeon','논현·소래 택지지구, 소래포구·호구포역'],
    ['서창동','seochang','서창지구 신도시 아파트'],
    ['도림동','dorim','도림 주거·개발지, 남동구 남부'],
  ]],
  ['부평구','bupyeong-gu',[
    ['부평동','bupyeong-dong','부평역·부평지하상가·부평시장, 상권·오피스텔'],
    ['부개동','bugae','부개역 주거, 부천 부개 접경'],
    ['삼산동','samsan','삼산 아파트·삼산월드체육관, 부천 상동 접경'],
    ['산곡동','sangok','산곡 주거·재개발, 산곡역'],
    ['청천동','cheongcheon','청천 주거·부평산업단지 인접'],
    ['십정동','sipjeong','십정 주거·재개발, 백운역·동암역'],
  ]],
  ['계양구','gyeyang-gu',[
    ['계산동','gyesan','계산 상권·주거, 계산역·경인교대입구역'],
    ['작전동','jakjeon','작전 주거·상권, 작전역'],
    ['효성동','hyoseong','효성 주거, 천마산 자락'],
    ['계양동','gyeyang-dong','계양 주거, 계양신도시 예정지·귤현'],
    ['임학동','imhak','임학 주거, 계양구청·임학역'],
  ]],
  ['미추홀구','michuhol-gu',[
    ['주안동','juan','주안역 상권·주거, 주안국가산단 인접'],
    ['도화동','dohwa','도화 주거·재개발, 도화역·인천대 제물포캠퍼스'],
    ['용현동','yonghyeon','용현 주거·인하대학교, 용현역'],
    ['학익동','hagik','학익 주거·재개발, 법조타운'],
    ['숭의동','sungui','숭의 원도심 주거, 숭의역·제물포'],
    ['관교동','gwangyo','관교·문학, 인천종합터미널·문학경기장 인접'],
  ]],
  ['서해구','seohae-gu',[
    ['청라동','cheongna-dong','청라국제도시 신도시, 호수공원·업무지구·오피스텔'],
    ['가정동','gajeong','가정·루원시티 재개발 신도시, 가정중앙시장'],
    ['석남동','seongnam','석남 주거·산업, 석남역'],
    ['가좌동','gajwa','가좌 주거·공업'],
    ['검암동','geomam','검암 주거, 검암역·공항철도'],
    ['연희동','yeonhui','연희 주거, 아시아드주경기장 인접'],
  ]],
  ['검단구','geomdan-gu',[
    ['검단동','geomdan-dong','검단 원도심·주거'],
    ['원당동','wondang','검단신도시 원당지구 아파트'],
    ['당하동','dangha','검단신도시 당하지구 아파트'],
    ['마전동','majeon','마전 주거·검단, 마전지구'],
    ['불로동','bullo','불로 주거·검단, 불로지구'],
  ]],
  ['영종구','yeongjong-gu',[
    ['영종동','yeongjong-dong','영종하늘도시 신도시 아파트, 인천공항 배후'],
    ['운서동','unseo','운서·공항신도시, 인천공항 근무자·호텔'],
    ['중산동','jungsan','중산 하늘도시 주거'],
    ['운남동','unnam','운남 주거, 구읍뱃터 인접'],
  ]],
  ['제물포구','jemulpo-gu',[
    ['신포동','sinpo','신포국제시장·개항장 원도심 상권'],
    ['신흥동','sinheung','신흥 주거·항만 인접, 인천항'],
    ['송림동','songnim','송림 원도심·재개발'],
    ['화수동','hwasu','화수 주거·항만'],
    ['만석동','manseok','만석 항만·원도심'],
  ]],
]

const SPECS = []
for (const [guName, guSlug, dongs] of GU)
  for (const [name, slug, hint] of dongs)
    SPECS.push({ city:'incheon', guName, guSlug, name, slug, hint })

function prompt(s) {
  return [
    `당신은 '간다GO' 출장마사지·홈타이 지역 안내 사이트의 지역 콘텐츠 작성자입니다.`,
    `대상 지역: 인천광역시 ${s.guName} ${s.name}. 지역 특성 힌트: ${s.hint}.`,
    `이 지역의 실제 생활권 성격(신도시/원도심/상권/산업/공항·항만/역세권 등), 가까운 지하철·공항철도역과 교통, 대표 랜드마크를 정확히 반영해 필드를 한국어로 작성하세요.`,
    `규칙:`,
    `- 방문형 서비스 안내이며 실제 오프라인 매장이 아님. 매장 주소/영업시간/리뷰/평점 언급 금지.`,
    `- 선정적·불법 표현 금지. '1위/최저가/추천/보장' 등 과장·순위 표현 금지.`,
    `- 지역명만 반복하지 말 것(도어웨이 금지). 실제 생활권 특성으로 차별화.`,
    `- 오피스텔·아파트·원룸·다세대·호텔/숙소 등 건물 유형별 출입 기준(공동현관·엘리베이터·방문 등록·주차·야간 출입)과 예약 전 확인을 자연스럽게 포함.`,
    `- 공항·항만·산업단지·신도시 인접 특성이 있으면 이동 시간·차량 이동·숙소 출입을 반영.`,
    `- 확실치 않은 특정 사실(정확한 상호·번지수 등)은 지어내지 말고 일반적 생활권 성격으로 서술.`,
    `분량: overview 300~400자, living 300~400자, transport 250~350자, venues 450~600자, tips 400~550자. 합계 공백 포함 2200자 이상.`,
    `meta_desc는 공백 포함 80자 이내로 "${s.name} 출장마사지" 자연 포함. checklist 4개, faqs 3개(첫 질문은 지역 특성 관련), who/how/why 각 40~70자.`,
  ].join('\n')
}

phase('Generate')
log(`인천 행정동 ${SPECS.length}곳 생성 시작`)
const results = await parallel(SPECS.map((s) => () =>
  agent(prompt(s), { schema: SCHEMA, label: `incheon:${s.slug}`, phase: 'Generate' })
    .then(c => (c ? { spec: s, content: c } : null))
))
const ok = results.filter(Boolean)
log(`생성 완료: ${ok.length}/${SPECS.length}`)
return ok
