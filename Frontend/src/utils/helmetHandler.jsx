import { Helmet } from 'react-helmet-async'

const hemlmetHandler = ({title}) => {
    return (
        <Helmet>
            <title>{title} - خالد صقر</title>
        </Helmet>
    )
}

export default hemlmetHandler