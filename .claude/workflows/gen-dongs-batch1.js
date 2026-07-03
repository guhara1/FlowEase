export const meta = {
  name: 'gen-dongs-batch1',
  description: '부천 소사구·오정구 + 시흥 행정동 22곳의 고유 지역 콘텐츠를 병렬 생성',
  phases: [{ title: 'Generate', detail: '행정동별 고유 콘텐츠 생성' }],
}

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    meta_desc: { type: 'string', description: '80자 이내(공백 포함) 메타설명, "<동> 출장마사지" 자연 포함' },
    hero_sub: { type: 'string' },
    overview: { type: 'string', description: '지역 개요 250~350자' },
    living: { type: 'string', description: '생활권과 랜드마크 250~350자' },
    transport: { type: 'string', description: '가까운 역·광역교통 200~300자' },
    venues: { type: 'string', description: '이용 장소별 기준 400~550자' },
    tips: { type: 'string', description: '방문 시 자주 있는 상황/이용 팁 350~500자' },
    checklist: { type: 'array', items: { type: 'string' }, minItems: 4, maxItems: 4 },
    faqs: {
      type: 'array', minItems: 3, maxItems: 3,
      items: { type: 'object', additionalProperties: false, required: ['q', 'a'],
        properties: { q: { type: 'string' }, a: { type: 'string' } } },
    },
    who: { type: 'string' }, how: { type: 'string' }, why: { type: 'string' },
  },
  required: ['meta_desc','hero_sub','overview','living','transport','venues','tips','checklist','faqs','who','how','why'],
}

const SPECS = [
  // 부천 소사구
  {city:'bucheon',guName:'소사구',guSlug:'sosa-gu',name:'소사본동',slug:'sosabon',hint:'소사역(1호선) 원도심 주택가, 서울 구로 접경, 다세대·상가'},
  {city:'bucheon',guName:'소사구',guSlug:'sosa-gu',name:'송내동',slug:'songnae',hint:'송내역(1호선) 환승 상권, 인천 부개 접경, 아파트·오피스텔'},
  {city:'bucheon',guName:'소사구',guSlug:'sosa-gu',name:'범박동',slug:'beombak',hint:'범박·계수 신규 아파트 주거지, 서울 광명·시흥 접경'},
  {city:'bucheon',guName:'소사구',guSlug:'sosa-gu',name:'괴안동',slug:'goean',hint:'괴안 주택가·다세대, 서울 온수·구로 접경'},
  {city:'bucheon',guName:'소사구',guSlug:'sosa-gu',name:'옥길동',slug:'okgil',hint:'옥길지구 신도시 아파트, 시흥 옥길과 연접'},
  {city:'bucheon',guName:'소사구',guSlug:'sosa-gu',name:'심곡본동',slug:'simgokbon',hint:'소사역 인근 원도심 주택·상가'},
  // 부천 오정구
  {city:'bucheon',guName:'오정구',guSlug:'ojeong-gu',name:'오정동',slug:'ojeong-dong',hint:'오정구청·오정대공원 주거, 김포공항 인접 북부'},
  {city:'bucheon',guName:'오정구',guSlug:'ojeong-gu',name:'원종동',slug:'wonjong',hint:'원종 주택·상업, 김포공항·서울 강서 인접'},
  {city:'bucheon',guName:'오정구',guSlug:'ojeong-gu',name:'고강동',slug:'gogang',hint:'고강 주택가, 서울 화곡·강서 접경'},
  {city:'bucheon',guName:'오정구',guSlug:'ojeong-gu',name:'성곡동',slug:'seonggok',hint:'성곡·오정산업단지 인접 산업·주거'},
  {city:'bucheon',guName:'오정구',guSlug:'ojeong-gu',name:'여월동',slug:'yeowol',hint:'여월지구 아파트, 여월농업공원·자연드림파크'},
  // 시흥 (일반구 없음)
  {city:'siheung',guName:null,guSlug:null,name:'은행동',slug:'eunhaeng',hint:'은행지구 아파트 주거, 시흥ABC행복센터 인근'},
  {city:'siheung',guName:null,guSlug:null,name:'대야동',slug:'daeya',hint:'시흥대야역, 상권·주거, 신천 인접'},
  {city:'siheung',guName:null,guSlug:null,name:'신천동',slug:'sincheon',hint:'신천역, 시흥 원도심 상권·주거'},
  {city:'siheung',guName:null,guSlug:null,name:'신현동',slug:'sinhyeon',hint:'신현 도농복합, 은계지구 인근 주거·농지'},
  {city:'siheung',guName:null,guSlug:null,name:'매화동',slug:'maehwa',hint:'매화 도농복합, 물류·화훼 지역'},
  {city:'siheung',guName:null,guSlug:null,name:'목감동',slug:'mokgam',hint:'목감지구 신도시 아파트, 수도권제1순환 인접'},
  {city:'siheung',guName:null,guSlug:null,name:'능곡동',slug:'neunggok',hint:'능곡지구 아파트, 시흥시청 인근'},
  {city:'siheung',guName:null,guSlug:null,name:'장곡동',slug:'janggok',hint:'장현지구·시흥시청역, 공공주택 신도시'},
  {city:'siheung',guName:null,guSlug:null,name:'연성동',slug:'yeonseong',hint:'관곡지·연성 도농복합, 시흥시청 인접'},
  {city:'siheung',guName:null,guSlug:null,name:'군자동',slug:'gunja',hint:'군자 도농복합, 서해안·군자매립지 인접'},
  {city:'siheung',guName:null,guSlug:null,name:'월곶동',slug:'wolgot',hint:'월곶포구·월곶역, 해안 상권·오피스텔'},
]

function prompt(s) {
  const loc = s.guName ? `${s.city==='bucheon'?'경기 부천시':'경기 시흥시'} ${s.guName} ${s.name}` : `경기 시흥시 ${s.name}`
  return [
    `당신은 '간다GO' 출장마사지·홈타이 지역 안내 사이트의 지역 콘텐츠 작성자입니다.`,
    `대상 지역: ${loc}. 지역 특성 힌트: ${s.hint}.`,
    `이 지역의 실제 생활권 성격(주거/상권/신도시/산업/원도심/역세권 등), 가까운 지하철역·교통, 대표 랜드마크를 정확히 반영해 필드를 한국어로 작성하세요.`,
    `규칙:`,
    `- 방문형 서비스 안내이며 실제 오프라인 매장이 아님. 매장 주소/영업시간/리뷰/평점 언급 금지.`,
    `- 선정적·불법 표현 금지. '1위/최저가/추천/보장' 등 과장·순위 표현 금지.`,
    `- 지역명만 반복하지 말 것(도어웨이 금지). 실제 생활권 특성으로 차별화.`,
    `- 오피스텔·아파트·원룸·다세대·숙소 등 건물 유형별 출입 기준(공동현관·엘리베이터·방문 등록·주차·야간 출입)과 예약 전 확인을 자연스럽게 포함.`,
    `- 확실치 않은 특정 사실(정확한 상호·번지수 등)은 지어내지 말고 일반적 생활권 성격으로 서술.`,
    `필드 분량: overview 250~350자, living 250~350자, transport 200~300자, venues 400~550자, tips 350~500자.`,
    `overview+living+transport+venues+tips 합계가 공백 포함 2000자 이상이 되도록 충분히 작성.`,
    `meta_desc는 공백 포함 80자 이내로, "${s.name} 출장마사지"를 자연스럽게 포함.`,
    `checklist는 예약 전 확인 4개, faqs는 3개(첫 질문은 이 지역 특성 관련), who/how/why는 각 40~70자.`,
  ].join('\n')
}

phase('Generate')
log(`행정동 ${SPECS.length}곳 콘텐츠 생성 시작`)
const results = await parallel(SPECS.map((s, i) => () =>
  agent(prompt(s), { schema: SCHEMA, label: `${s.city}:${s.slug}`, phase: 'Generate' })
    .then(c => (c ? { spec: s, content: c } : null))
))
const ok = results.filter(Boolean)
log(`생성 완료: ${ok.length}/${SPECS.length}`)
return ok
