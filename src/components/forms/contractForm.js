import React from 'react';

export default props => {
    const { values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        status,
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <label>Contract Method</label>
            <select
                name="action"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ display: 'block' }}
            >
                <option value="" label="Select a method" />
                <option value="setData" label="setData" />
            </select>
            <br />
            <br />

            <input
                name="datastring"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.datastring}
                placeholder='string'
            />
            <br />

            {touched.amountInWei && errors.amountInWei && <div>{errors.amountInWei}</div>}
            <button type="submit" >
                Submit
        </button>
        </form>
    );
}