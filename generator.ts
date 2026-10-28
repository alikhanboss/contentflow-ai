export type ContentType = 'post' | 'story' | 'reel' | 'ad';
export type Language = 'ru' | 'kk' | 'both';
export interface Business { name: string; type: string; description: string; services: string; offers: string; audience: string; language: Language; tone: string; formats: string[]; }
export interface Draft { id: string; type: ContentType; title: string; text: string; visual: string; language: 'ru' | 'kk'; date: string; variant: number; business: Business; }
export const typeLabels: Record<ContentType, string> = { post: 'Instagram-пост', story: 'Stories', reel: 'Сценарий Reels', ad: 'Рекламный текст' };
export const emptyBusiness: Business = {name:'',type:'',description:'',services:'',offers:'',audience:'Широкая аудитория',language:'ru',tone:'Дружелюбный',formats:['post','story','reel','plan']};
export const examples: Business[] = [
 {...emptyBusiness,name:'AutoCare Almaty',type:'Детейлинг',description:'Студия ухода за автомобилями в Алматы.',services:'Мойка кузова, химчистка салона, полировка',audience:'Автовладельцы'},
 {...emptyBusiness,name:'Кофейня Jılı',type:'Кофейня',description:'Небольшая кофейня в Алматы. Место для встреч и спокойных пауз.',services:'Кофе, выпечка, сезонные напитки'},
 {...emptyBusiness,name:'Aina Studio',type:'Салон красоты',description:'Студия красоты в Алматы.',services:'Стрижки, укладки, уход за волосами'},
 {...emptyBusiness,name:'Дүкен',type:'Магазин',description:'Локальный магазин товаров для дома.',services:'Посуда, текстиль, аксессуары для дома'},
 {...emptyBusiness,name:'Taza Home',type:'Клининговая компания',description:'Уборка квартир и домов в Алматы.',services:'Поддерживающая уборка, генеральная уборка'}
];
export function today() { return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Almaty',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()); }
export function addDays(date: string,n:number) { const d=new Date(date+'T12:00:00Z'); d.setUTCDate(d.getUTCDate()+n); return d.toISOString().slice(0,10); }
export function dateLabel(date: string) { return new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short'}).format(new Date(date+'T12:00:00')); }
const ruTopics=['Давайте знакомиться','В центре внимания — детали','Что вам интересно узнать?','Один день за кадром','Выбираем вместе','Сохраняйте на будущее','Время для знакомства'];
const kkTopics=['Таныс болайық','Әр бөлшекке назар','Не білгіңіз келеді?','Бір күннің көрінісі','Бірге таңдайық','Кейінге сақтап қойыңыз','Танысатын уақыт келді'];
export function makeDraft(b:Business,type:ContentType,language:'ru'|'kk',date:string,variant:number,id:string=crypto.randomUUID()):Draft {
 const kk=language==='kk'; const title=(kk?kkTopics:ruTopics)[variant%7];
 const facts=[b.description.trim(),b.services.trim()?(kk?'Қызметтер туралы ақпарат: ':'Наши услуги: ')+b.services.trim():'',b.offers.trim()?(kk?'Бағалар мен ұсыныстар: ':'Цены и предложения: ')+b.offers.trim():''].filter(Boolean).join('\n');
 const openings:Record<string,string>=kk?{'Профессиональный':`${b.name} туралы ақпарат.`, 'Дружелюбный':`Сәлем! Бұл — ${b.name}.`, 'Современный':`${b.name}. Жаңа таныстыққа дайынсыз ба?`, 'Премиальный':`${b.name} — жақынырақ танысайық.`}:{'Профессиональный':`Знакомьтесь: ${b.name}.`, 'Дружелюбный':`Привет! Это ${b.name}.`, 'Современный':`${b.name}. Давайте знакомиться ближе.`, 'Премиальный':`${b.name} — время познакомиться поближе.`};
 const ctas=kk?['Сұрақтарыңызды жеке хабарламаға жазыңыз.','Сізге не қызық? Пікірге жазыңыз.','Толығырақ білу үшін бізге хабарласыңыз.']:['Напишите нам в личные сообщения — обсудим ваши вопросы.','Что вам интересно узнать? Напишите в комментариях.','Свяжитесь с нами, чтобы уточнить детали.'];
 const intro=openings[b.tone]||openings['Дружелюбный']; const cta=ctas[variant%3];
 const angles=kk?['Бізбен жақынырақ танысыңыз.','Қызмет таңдағанда сіз үшін қандай бөлшектер маңызды?','Қызметтеріміз туралы қандай сұрағыңыз бар?','Жұмыс барысынан шағын көрініс.','Қай қызмет туралы көбірек білгіңіз келеді?','Қызметтер тізімін қажет кезде табу үшін сақтап қойыңыз.','Біз туралы қысқаша ақпаратты бір жерге жинадық.']:['Расскажем немного о том, чем мы занимаемся.','На какие детали вы обращаете внимание при выборе услуги?','Есть вопросы о наших услугах? Начнём разговор.','Небольшой взгляд на то, что обычно остаётся за кадром.','О какой услуге вам хотелось бы узнать больше?','Сохраните список услуг, чтобы вернуться к нему, когда понадобится.','Собрали самое главное о нас в одном месте.'];
 const angle=angles[variant%angles.length];
 let text=`${intro}\n\n${angle}\n\n${facts}\n\n${cta}`;
 if(type==='story') text=kk?`1-кадр · ${b.name}\n${title}\n\n2-кадр · Танысу\n${facts}\n\n3-кадр · Сұрақ стикері\n${cta}`:`Кадр 1 · ${b.name}\n${title}\n\nКадр 2 · Знакомство\n${facts}\n\nКадр 3 · Стикер с вопросом\n${cta}`;
 if(type==='reel') text=kk?`0–3 сек · Кадрдағы мәтін: «${title}»\n\n3–12 сек · Жұмыс барысын көрсетіңіз. Дауыс: «${intro}»\n${facts}\n\n12–20 сек · Соңғы кадр: ${b.name}\n${cta}`:`0–3 сек · Текст на экране: «${title}»\n\n3–12 сек · Покажите рабочий процесс. Закадровый голос: «${intro}»\n${facts}\n\n12–20 сек · Финальный кадр: ${b.name}\n${cta}`;
 if(type==='ad') text=`${b.name}\n\n${facts}\n\n${cta}`;
 const kkAudience:Record<string,string>={'Молодёжь':'Жастар','Семьи':'Отбасылар','Предприниматели':'Кәсіпкерлер','Автовладельцы':'Автокөлік иелері','Широкая аудитория':'Кең аудитория','Другая аудитория':'Басқа аудитория'};
 const audience=kk?`Мақсатты аудитория: ${kkAudience[b.audience]||b.audience}.`:`Аудитория: ${b.audience}.`;
 const subjects=kk?['Кеңістіктің жалпы көрінісін түсіріңіз.','Жұмысқа қатысты бір бөлшекті жақыннан түсіріңіз.','Сұрақ жазуға арналған бос орны бар кадр жасаңыз.','Жұмыс барысының бірнеше кезеңін түсіріңіз.','Екі қызметті салыстыруға арналған карточка жасаңыз.','Қызметтер тізімі бар қарапайым карточка жасаңыз.','Кеңістіктің суреті мен бизнес атауын біріктіріңіз.']:['Снимите общий план вашего пространства.','Покажите крупным планом одну деталь рабочего процесса.','Сделайте кадр со свободным местом для вопроса аудитории.','Снимите несколько последовательных этапов работы.','Подготовьте карточку с двумя услугами для опроса.','Оформите простой визуальный список ваших услуг.','Соедините фотографию пространства и название бизнеса.'];
 const visual=`${subjects[variant%subjects.length]} ${kk?'Кадрға атауын қосыңыз:':'Добавьте название:'} ${b.name}. ${audience}`;
 return {id,type,title,text,visual,language,date,variant,business:structuredClone(b)};
}
// Replace this adapter with a server-side AI provider later; never put API secrets in the client.
export function generateContent(b:Business,start=today()):Draft[] {
 const types=b.formats.filter(x=>x!=='plan') as ContentType[];
 const selected=types.length?types:['post','story','reel'] as ContentType[];
 const count=b.formats.includes('plan')?14:selected.length*2;
 const langs:('ru'|'kk')[]=b.language==='both'?['ru','kk']:[b.language];
 return Array.from({length:count},(_,i)=>langs.map(l=>makeDraft(b,selected[i%selected.length],l,addDays(start,b.formats.includes('plan')?i:Math.floor(i*14/count)),i))).flat();
}
export function exportText(drafts:Draft[]) {return 'ContentFlow AI · Демонстрационные черновики\nПроверьте информацию перед публикацией.\n\n'+drafts.map(d=>`${dateLabel(d.date)} · ${typeLabels[d.type]} · ${d.language==='kk'?'Қазақша':'Русский'}\n${d.title}\n\n${d.text}\n\nВизуальная идея: ${d.visual}\n`).join('\n────────────────────────\n\n');}
export function exportCSV(drafts:Draft[]) { const rows=[['Дата','Формат','Язык','Заголовок','Текст','Визуальная идея'],...drafts.map(d=>[d.date,typeLabels[d.type],d.language,d.title,d.text,d.visual])];return '\uFEFF'+rows.map(r=>r.map(v=>'"'+v.replaceAll('"','""')+'"').join(',')).join('\r\n'); }
