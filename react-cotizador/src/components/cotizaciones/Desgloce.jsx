import React, { Fragment } from 'react';

const Desgloce = () => {
    return (
        <Fragment>
            <div className="mt-1 mx-3 bg-white rounded-lg shadow-lg p-4 w-1/4">
                <div className="text-gray-600 text-sm font-light mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-xl">Subtotal</span>
                        <span className="text-right text-xl">$145</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-left text-xl">IVA 16%</span>
                        <span className="text-right text-xl">$23.20</span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                        <span className="text-left text-xl">Total</span>
                        <span className="text-right text-xl">$168.20</span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}; 

export default Desgloce;