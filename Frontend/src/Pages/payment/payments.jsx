import React, { useEffect, useState } from 'react'
import Box from './box';

const payments = (props) => {
    return (
        <div>
            <div class="grid max-w-screen-lg px-10 mx-auto grid-cols-2 md:grid-cols-4 gap-10 my-20 text-center">
                {
                    props.payments.map((payment) => {
                        return (
                            <Box payment={payment} course={props.course}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default payments
