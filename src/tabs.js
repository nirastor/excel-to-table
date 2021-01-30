export default function createTabs(props) {
  let tabs = [];
  for (let tab in props.tabs) {
    let className = 'tab';
    if (tab === props.selectedTab) {
      className += ' tab--selected';
    }
    tabs.push(
      <li key={tab} id={tab} className={className} onClick={props.handleTabChange}>
        {props.tabs[tab].displayName}
      </li>
    );
  }
  
  return (
    <ul>
      {tabs}
    </ul>
  );
}
