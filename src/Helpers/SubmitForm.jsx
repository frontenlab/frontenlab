import React from 'react';
import { useForm } from 'react-hook-form';
import '../Components/Common/SubmitOverlay/SubmitOverlay.css'

const SubmitForm = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset,
    } = useForm();

    const handlePasteCapture = (e) => {
        // Prevent the default paste behavior
        e.preventDefault();

        // Get the pasted content as plain text
        const pastedData = e.clipboardData.getData('Text').trim();

        // Normalize URLs if needed (e.g., remove trailing slashes)
        const normalizedData = pastedData.replace(/\/+$/, '');

        // Insert cleaned data into the input field
        document.execCommand('insertText', false, normalizedData);
    };

    const onSubmitForm = (data) => {
        onSubmit(data);  // Call the onSubmit handler
        reset();         // Reset the form after submission
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="challengeDisplay-input-links">
            <div className="challengeDisplay-live-url-input challengeDisplay-input-box">
                <p>Live site URL</p>
                <input
                    type="text"
                    className="overlay-input live-url"
                    placeholder="Live site URL"
                    autoComplete="off"
                    {...register('liveUrl', {
                        required: 'Live site URL is required.',
                        pattern: {
                            value: /^https?:\/\/([\w-]+\.)?github\.io(\/[\w- ./?%&=]*)?$/,
                            message: 'Please enter a valid live site URL.',
                        },
                        onChange: () => clearErrors('submit'),
                    })}
                    onPasteCapture={handlePasteCapture} // Attach paste capture handler
                />
                {errors.liveUrl && <div className="overlay-input-error">{errors.liveUrl.message}</div>}
            </div>

            {errors.submit && <div className="overlay-input-error">{errors.submit.message}</div>}

            <button type="submit" className='challengeDescription-submit-button'>Submit Solution</button>
        </form>
    );
};

export default SubmitForm;
