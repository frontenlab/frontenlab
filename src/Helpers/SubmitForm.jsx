import React from 'react';
import { useForm } from 'react-hook-form';
import '../Components/Common/SubmitOverlay/SubmitOverlay.css'

const SubmitForm = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="challengeDisplay-input-links">
            {/* <div className="challengeDisplay-repo-url-input challengeDisplay-input-box">
                <p>Repository URL</p>
                <input
                    type="text"
                    className="overlay-input repo-url"
                    placeholder="GitHub repository URL"
                    {...register('repoUrl', {
                        required: 'Repository URL is required.',
                        pattern: {
                            value: /^https:\/\/.+$/,
                            message: 'Please enter a valid GitHub repository URL.',
                        },
                        onChange: () => clearErrors('submit'),
                    })}
                    onPasteCapture={handlePasteCapture} // Attach paste capture handler
                />
                {errors.repoUrl && <div className="overlay-input-error">{errors.repoUrl.message}</div>}
            </div> */}

            <div className="challengeDisplay-live-url-input challengeDisplay-input-box">
                <p>Live site URL</p>
                <input
                    type="text"
                    className="overlay-input live-url"
                    placeholder="Live site URL"
                    {...register('liveUrl', {
                        required: 'Live site URL is required.',
                        pattern: {
                            value: /^https:\/\/.+$/,
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
