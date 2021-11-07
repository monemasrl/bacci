import React from "react";
import { motion, AnimatePresence } from "framer-motion"
import './megamenu.scss'

const Megamenu = ({mega, setMega})=>{

    return(


        <AnimatePresence>
        {mega && (
      
            <motion.div
             className="wrapper-megamenu" onMouseOut={()=>setMega(false)}  
            
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            >
                 <div className="mega">
                     Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. C
                     urabitur aliquet quam id dui posuere blandit. Curabitur arcu erat, 
                     accumsan id imperdiet et, porttitor at sem. Curabitur non nulla sit amet ni
                     sl tempus convallis quis ac lectus. Vestibulum ante ipsum primis in faucibus orc
                     i luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet a
                     liquam vel, ullamcorper sit amet ligula. Vivamus magna justo, lacinia eget conse
                     ctetur sed, convallis at tellus. Vestibulum ante ipsum primis in faucibus orci l
                     uctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliq
                     uam vel, ullamcorper sit amet ligula. Sed porttitor lectus nibh. Vestibulum ante
                      ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec v
                      elit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur
                       non nulla sit amet nisl tempus convallis quis ac lectus.

Vivamus suscipit tortor eget felis porttitor volutpat. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Cras ultricies ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada.</div> 
              </motion.div> 
              
        )}
      </AnimatePresence>
       
    )
}

export default Megamenu