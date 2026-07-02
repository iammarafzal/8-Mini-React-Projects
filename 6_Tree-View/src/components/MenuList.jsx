import MenuItem from '../components/MenuItem'

function MenuList({ list = []}) {
  return (
    <ul className="menu-list-container">
        {
            list && list.length > 0 ?
                list.map((listItem) => <MenuItem key={listItem.to} item={listItem}/>)
            : null
        }
    </ul>
  )
}

export default MenuList
