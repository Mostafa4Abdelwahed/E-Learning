import { Helmet } from 'react-helmet-async'

const hemlmetHandler = ({title}) => {
    return (
        <Helmet>
            <title>{title} - محمد علي</title>
        </Helmet>
    )
}

export default hemlmetHandler
