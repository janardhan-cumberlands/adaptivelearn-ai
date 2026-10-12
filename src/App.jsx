import { useMemo, useState } from "react";
import "./App.css";

const questions = [
 {topic:"Artificial Intelligence",icon:"🧠",q:"What is the primary goal of an adaptive user interface?",options:["Display identical content to everyone","Adjust the interface to user needs or behavior","Remove all user controls","Replace the operating system"],answer:1,why:"Adaptive interfaces adjust presentation or behavior to user needs, context, or interaction history."},
 {topic:"Human-Computer Interaction",icon:"🖥️",q:"Which practice can improve accessibility?",options:["Use low-contrast text","Remove keyboard navigation","Provide readable text and keyboard support","Make buttons hard to identify"],answer:2,why:"Readable content and keyboard support help more people operate an interface."},
 {topic:"Data and Machine Learning",icon:"📊",q:"What can a machine-learning model learn from?",options:["Relevant examples and data","Only button colors","No input data","Decorations alone"],answer:0,why:"Machine-learning systems identify patterns from data; this prototype itself uses explicit rules, not a trained model."}
];

export default function App(){
 const [dark,setDark]=useState(false),[compact,setCompact]=useState(false);
 const [topic,setTopic]=useState(questions[0].topic),[qi,setQi]=useState(0);
 const [choice,setChoice]=useState(null),[feedback,setFeedback]=useState(false),[history,setHistory]=useState([]);
 const current=questions[qi];
 const results=useMemo(()=>questions.map(q=>{
  const items=history.filter(h=>h.topic===q.topic),correct=items.filter(h=>h.correct).length;
  return {...q,attempted:items.length,score:items.length?Math.round(correct/items.length*100):null};
 }),[history]);
 const selected=results.find(r=>r.topic===topic);
 const recommendation=!selected||!selected.attempted
  ?{level:"Getting started",title:"Start with a foundation",detail:"Answer a practice question so the dashboard can begin personalizing your learning."}
  :selected.score<60
  ?{level:"Foundation",title:"Review the fundamentals",detail:`Your accuracy in ${topic} is ${selected.score}%. Review introductory material and practice again.`}
  :selected.score<80
  ?{level:"Practice",title:"Build your confidence",detail:`Your accuracy is ${selected.score}%. Try another question and review incorrect answers.`}
  :{level:"Advanced",title:"Explore advanced material",detail:`Your accuracy is ${selected.score}%. Consider more challenging material in ${topic}.`};
 const correct=history.filter(h=>h.correct).length;
 function submit(){if(choice===null||feedback)return;setHistory(h=>[...h,{topic:current.topic,correct:choice===current.answer}]);setFeedback(true)}
 function next(){const n=(qi+1)%questions.length;setQi(n);setTopic(questions[n].topic);setChoice(null);setFeedback(false)}
 function reset(){setHistory([]);setQi(0);setTopic(questions[0].topic);setChoice(null);setFeedback(false)}
 function practice(){const n=questions.findIndex(q=>q.topic===topic);setQi(n<0?0:n);setChoice(null);setFeedback(false);document.getElementById("practice")?.scrollIntoView({behavior:"smooth"})}
 return <div className={`app ${dark?"dark":""} ${compact?"compact":""}`}>
  <aside className="sidebar"><div className="brand"><b className="brandIcon">A</b><div><strong>AdaptiveLearn</strong><small>PERSONAL LEARNING</small></div></div>
   <p className="eyebrow">WORKSPACE</p><button className="nav active" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>▦ Dashboard</button><button className="nav" onClick={()=>document.getElementById("practice")?.scrollIntoView({behavior:"smooth"})}>◉ Practice quiz</button><button className="nav" onClick={()=>document.getElementById("recommendations")?.scrollIntoView({behavior:"smooth"})}>✧ Recommendations</button>
   <div className="sideNote"><b>✦ Your learning, your pace</b><p>Recommendations respond to your practice results.</p></div><div className="profile"><span>L</span><div><b>Learner</b><small>Student account</small></div></div>
  </aside>
  <main className="main"><header className="topbar"><div><small className="eyebrow">LEARNING WORKSPACE</small><h1>Your dashboard</h1></div><button className="secondary" onClick={()=>setDark(!dark)}>{dark?"☀ Light mode":"☾ Dark mode"}</button></header>
   <section className="hero"><small>✦ ADAPTIVE LEARNING</small><h2>Learn at your own pace.</h2><p>Practice, track your progress, and receive recommendations based on your performance.</p><span className="heroArt" aria-hidden="true">✧</span></section>
   <section className="stats"><article><small>Questions answered</small><strong>{history.length}</strong><span>Across practice sessions</span></article><article><small>Overall accuracy</small><strong>{history.length?Math.round(correct/history.length*100):0}%</strong><span>{history.length?"Based on your answers":"Awaiting first attempt"}</span></article><article><small>Topics explored</small><strong>{new Set(history.map(h=>h.topic)).size} <em>/ 3</em></strong><span>Learning areas practiced</span></article></section>
   <section className="grid"><article className="panel"><small className="eyebrow">YOUR LEARNING PATH</small><h3>Explore topics</h3><div className="topics">{results.map(r=><button key={r.topic} className={`topic ${topic===r.topic?"chosen":""}`} onClick={()=>setTopic(r.topic)} aria-pressed={topic===r.topic}><span className="topicIcon">{r.icon}</span><span className="topicBody"><b>{r.topic}</b><small>{r.attempted?`${r.attempted} question(s) attempted`:"Ready to explore"}</small><span className="track"><i style={{width:`${r.score??0}%`}}/></span></span><b className="score">{r.score===null?"—":`${r.score}%`}</b></button>)}</div></article>
    <article className="panel recommendation" id="recommendations"><small className="eyebrow">PERSONALIZED FOR YOU</small><h3>Next best step ✦</h3><span className="pill">{recommendation.level}</span><h2>{recommendation.title}</h2><p>{recommendation.detail}</p><div className="selected"><small>Selected topic</small><b>{topic}</b></div><button className="primary" onClick={practice}>Practice this topic →</button></article></section>
   <section className="panel practice" id="practice"><div className="quizHead"><div><small className="eyebrow">KNOWLEDGE CHECK</small><h3>Practice quiz</h3><p>Your results update your learning recommendations.</p></div><small>Question {qi+1} of {questions.length}</small></div><span className="pill">{current.topic}</span><h2>{current.q}</h2><div className="answers">{current.options.map((opt,i)=>{let cls="answer";if(choice===i)cls+=" chosen";if(feedback&&i===current.answer)cls+=" right";else if(feedback&&choice===i)cls+=" wrong";return <button key={opt} className={cls} disabled={feedback} onClick={()=>setChoice(i)} aria-pressed={choice===i}><b>{String.fromCharCode(65+i)}</b><span>{opt}</span>{feedback&&i===current.answer?<strong>✓</strong>:null}</button>})}</div>
    {feedback&&<p className={`feedback ${choice===current.answer?"good":"bad"}`} role="status"><b>{choice===current.answer?"Correct!":"Not quite."}</b> {current.why}</p>}<div className="actions"><button className="secondary" onClick={reset}>Reset progress</button>{!feedback?<button className="primary" disabled={choice===null} onClick={submit}>Check answer →</button>:<button className="primary" onClick={next}>Next question →</button>}</div></section>
   <section className="settings"><div><h3>Personalize your experience</h3><p>Choose how much information you see on the dashboard.</p></div><label><input type="checkbox" checked={compact} onChange={e=>setCompact(e.target.checked)}/> Compact layout</label></section>{compact&&<p className="compactNote">Compact layout is enabled. Topic cards use a condensed presentation.</p>}
   <footer>AdaptiveLearn AI · Demonstration project · Learning data stays in this browser session.</footer>
  </main></div>
}