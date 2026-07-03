export const meta = {
  name: 'gen-dongs-batch3-enrich',
  description: '부족한 행정동 19곳을 2,200~2,500자 고유 콘텐츠로 재생성',
  phases: [{ title: 'Generate', detail: '보강 대상 행정동 재생성' }],
}

const SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    meta_desc: { type: 'string', description: '80자 이내(공백 포함), "<동> 출장마사지" 자연 포함' },
    hero_sub: { type: 'string' },
    overview: { type: 'string', description: '지역 개요 350~450자' },
    living: { type: 'string', description: '생활권과 랜드마크 350~450자' },
    transport: { type: 'string', description: '가까운 역·광역교통 280~380자' },
    venues: { type: 'string', description: '이용 장소별 기준 550~700자' },
    tips: { type: 'string', description: '방문 시 자주 있는 상황/이용 팁 500~650자' },
    checklist: { type: 'array', items: { type: 'string' }, minItems: 4, maxItems: 4 },
    faqs: { type: 'array', minItems: 3, maxItems: 3,
      items: { type: 'object', additionalProperties: false, required: ['q','a'],
        properties: { q: { type: 'string' }, a: { type: 'string' } } } },
    who: { type: 'string' }, how: { type: 'string' }, why: { type: 'string' },
  },
  required: ['meta_desc','hero_sub','overview','living','transport','venues','tips','checklist','faqs','who','how','why'],
}

const B='bucheon', S='siheung'
const SPECS = [
  {city:B,guName:'원미구',guSlug:'wonmi-gu',name:'신중동',slug:'sinjungdong',hint:'신중동역(7호선) 상권·유흥·오피스텔 밀집, 부천시청 인접'},
  {city:B,guName:'원미구',guSlug:'wonmi-gu',name:'심곡동',slug:'simgok',hint:'부천역 북측 원도심, 부천대·전통시장, 다세대·상가'},
  {city:B,guName:'원미구',guSlug:'wonmi-gu',name:'춘의동',slug:'chunui',hint:'춘의역(7호선)·춘의테크노파크·부천종합운동장, 준공업·주거'},
  {city:B,guName:'원미구',guSlug:'wonmi-gu',name:'도당동',slug:'dodang',hint:'도당산·삼정동 공단 인접, 아파트·주택 혼재 북부 주거'},
  {city:B,guName:'원미구',guSlug:'wonmi-gu',name:'약대동',slug:'yakdae',hint:'중동신도시 서측 아파트 밀집 주거, 약대오거리'},
  {city:B,guName:'원미구',guSlug:'wonmi-gu',name:'원미동',slug:'wonmidong',hint:'원미산 자락 원도심 주택가·다세대, 경사 골목'},
  {city:B,guName:'원미구',guSlug:'wonmi-gu',name:'역곡동',slug:'yeokgok',hint:'역곡역(1호선)·가톨릭대 대학가, 서울 구로 접경, 원룸'},
  {city:B,guName:'원미구',guSlug:'wonmi-gu',name:'중동',slug:'jungdong',hint:'부천시청·현대백화점·신중동역 상권, 오피스텔·주상복합'},
  {city:B,guName:'원미구',guSlug:'wonmi-gu',name:'상동',slug:'sangdong',hint:'상동역(7호선)·상동호수공원 쇼핑 상권, 주상복합·오피스텔'},
  {city:B,guName:'소사구',guSlug:'sosa-gu',name:'심곡본동',slug:'simgokbon',hint:'소사역 인근 원도심 주택·상가'},
  {city:B,guName:'소사구',guSlug:'sosa-gu',name:'소사본동',slug:'sosabon',hint:'소사역(1호선) 원도심 주택가, 서울 구로 접경, 다세대·상가'},
  {city:B,guName:'오정구',guSlug:'ojeong-gu',name:'고강동',slug:'gogang',hint:'고강 주택가, 서울 화곡·강서 접경'},
  {city:S,guName:null,guSlug:null,name:'배곧동',slug:'baegot-dong',hint:'배곧신도시 오피스텔·레지던스·아파트, 해안, 인천 송도 인접, 차량 이동'},
  {city:S,guName:null,guSlug:null,name:'정왕동',slug:'jeongwang-dong',hint:'정왕역·시화산단·오이도 인접, 원룸·오피스텔, 산단 주거'},
  {city:S,guName:null,guSlug:null,name:'매화동',slug:'maehwa',hint:'매화 도농복합, 물류·화훼, 시흥 동부'},
  {city:S,guName:null,guSlug:null,name:'능곡동',slug:'neunggok',hint:'능곡지구 아파트, 시흥시청 인근'},
  {city:S,guName:null,guSlug:null,name:'장곡동',slug:'janggok',hint:'장현지구·시흥시청역, 공공주택 신도시'},
  {city:S,guName:null,guSlug:null,name:'신현동',slug:'sinhyeon',hint:'신현 도농복합, 은계지구 인근 주거·농지'},
  {city:S,guName:null,guSlug:null,name:'군자동',slug:'gunja',hint:'군자 도농복합, 서해안·군자매립지 인접'},
]

function prompt(s) {
  const loc = s.guName ? `${s.city===B?'경기 부천시':'경기 시흥시'} ${s.guName} ${s.name}` : `경기 시흥시 ${s.name}`
  return [
    `당신은 '간다GO' 출장마사지·홈타이 지역 안내 사이트의 지역 콘텐츠 작성자입니다.`,
    `대상 지역: ${loc}. 지역 특성 힌트: ${s.hint}.`,
    `이 지역의 실제 생활권 성격, 가까운 역·교통, 대표 랜드마크를 정확히 반영해 필드를 한국어로 충분히 길고 구체적으로 작성하세요.`,
    `규칙:`,
    `- 방문형 서비스 안내이며 실제 오프라인 매장이 아님. 매장 주소/영업시간/리뷰/평점 언급 금지.`,
    `- 선정적·불법 표현 금지. '1위/최저가/추천/보장' 등 과장·순위 표현 금지.`,
    `- 지역명만 반복하지 말 것(도어웨이 금지). 실제 생활권 특성으로 차별화.`,
    `- 오피스텔·아파트·원룸·다세대·숙소 등 건물 유형별 출입 기준(공동현관·엘리베이터·방문 등록·주차·야간 출입)과 예약 전 확인을 자연스럽게 포함.`,
    `- 확실치 않은 특정 사실은 지어내지 말고 일반적 생활권 성격으로 서술.`,
    `분량(중요): overview 350~450자, living 350~450자, transport 280~380자, venues 550~700자, tips 500~650자.`,
    `overview+living+transport+venues+tips 합계가 공백 포함 2400자 이상이 되도록 충분히 작성하세요(부족하면 안 됨).`,
    `meta_desc는 공백 포함 80자 이내로 "${s.name} 출장마사지" 자연 포함. checklist 4개, faqs 3개(첫 질문은 지역 특성 관련), who/how/why 각 40~70자.`,
  ].join('\n')
}

phase('Generate')
log(`보강 대상 ${SPECS.length}곳 재생성 시작`)
const results = await parallel(SPECS.map((s) => () =>
  agent(prompt(s), { schema: SCHEMA, label: `enrich:${s.slug}`, phase: 'Generate' })
    .then(c => (c ? { spec: s, content: c } : null))
))
const ok = results.filter(Boolean)
log(`재생성 완료: ${ok.length}/${SPECS.length}`)
return ok
