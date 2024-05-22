import { Helmet } from 'react-helmet-async'

const hemlmetHandler = ({title}) => {
    return (
        <Helmet>
            <title>{title} - مصطفي محمد</title>
        </Helmet>
    )
}

export default hemlmetHandler