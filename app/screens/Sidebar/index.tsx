import { getIcons, icons } from '@/app/components/Icon/icon'
import { SidebarContainer, SidebarItem, SidebarItems } from './SidebarStyled'

type ISidebarsContent = {
  label: string
  icon: keyof typeof icons
  path: string
  isVisible: boolean
}

const places: ISidebarsContent[] = [
  {
    label: 'Home',
    icon: 'home',
    path: '',
    isVisible: true,
  },
  {
    label: 'Desktop',
    icon: 'desktop',
    path: '',
    isVisible: true,
  },
  {
    label: 'Documents',
    icon: 'document',
    path: '',
    isVisible: true,
  },
  {
    label: 'Music',
    icon: 'music',
    path: '',
    isVisible: true,
  },
  {
    label: 'Pictures',
    icon: 'image',
    path: '',
    isVisible: true,
  },
  {
    label: 'Videos',
    icon: 'video',
    path: '',
    isVisible: true,
  },
  // "Trash",
]

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h4>Places</h4>
      <SidebarItems>
        {places.map((place: ISidebarsContent, index: number) => (
          <SidebarItem key={index}>
            {getIcons(place.icon)}
            {place.label}
          </SidebarItem>
        ))}
      </SidebarItems>
    </SidebarContainer>
  )
}

export default Sidebar
