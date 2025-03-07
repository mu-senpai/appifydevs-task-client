import { motion } from "framer-motion";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";

const EchoGPTCard = () => {

    const { handleNewChat } = useOutletContext();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col justify-center items-center">
            <div className="max-w-xs sm:max-w-md w-full text-center space-y-3 sm:space-y-4">
                <img
                    src="/echogpt-logo.svg"
                    alt="EchoGPT Logo"
                    className="w-16 sm:w-20 h-16 sm:h-20 object-contain mx-auto"
                />
                <h3 className="text-2xl sm:text-3xl text-gray-900 font-semibold">EchoGPT</h3>
                <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
                    Interact with EchoGPT, an AI that reflects your input for quick ideas,
                    summaries, or feedback.
                </p>
                <button onClick={handleNewChat} className="btn btn-outline rounded-2xl text-[#713cf4] border-gray-300 hover:text-white hover:border-[#713cf4] hover:bg-[#713cf4] w-full">
                    <IoChatboxEllipsesSharp className="scale-150" /> Start Interacting With EchoGPT
                </button>
            </div>
        </motion.div>
    );
};

export default EchoGPTCard;
