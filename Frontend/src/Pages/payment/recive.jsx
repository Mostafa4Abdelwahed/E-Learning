import React from 'react'

const recive = (props) => {
    return (
        <div class="lg:w-2/3 my-10 w-full mx-auto overflow-auto">
            <table class="table-auto border-2 w-full text-center whitespace-no-wrap">
                <thead>
                    <tr>
                        <th class="px-4 py-5 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">الكورس</th>
                        <th class="px-4 py-5 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">السعر</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="px-4 py-5">{props.title}</td>
                        <td class="px-4 py-5">{props.price}ج.م</td>
                    </tr>

                </tbody>
            </table>
        </div>

    )
}

export default recive
