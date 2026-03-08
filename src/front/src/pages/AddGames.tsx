import React from 'react';

function AddGames() {

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };

    function onFinishFailed() {

    }

    function onFinish() {

    }

    // return (
    //     <Form
    //         {...layout}
    //         name="basic"
    //         initialValues={{remember: true}}
    //         onFinish={onFinish}
    //         onFinishFailed={onFinishFailed}
    //     >
    //
    //         <Title level={2}>Ici vous pouvez ajouter un jeu à notre base de données.</Title>
    //
    //         <Form.Item {...tailLayout}>
    //             <Button type="primary" htmlType="submit">
    //                 Valider
    //             </Button>
    //         </Form.Item>
    //     </Form>
    // )
}

export default AddGames
