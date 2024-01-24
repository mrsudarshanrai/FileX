import { useFileProperties } from '@/app/hooks/useFileProperties'

const PropertiesModal = (props: { path: string }) => {
  const { properties } = useFileProperties(props.path)

  return <div style={{ height: '280px' }}>PropertiesModal</div>
}

export { PropertiesModal }
