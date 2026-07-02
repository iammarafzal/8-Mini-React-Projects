import MenuList from './MenuList'

function TreeView({ menus = [] }) {
  return (
    <div className='tree-view-container'>
      <div className="tree-view-header">
        <div className="app-mark">T</div>
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Tree Explorer</h1>
        </div>
      </div>
      <div className="tree-divider" />
        <MenuList list={menus}/>
    </div>
  )
}

export default TreeView
