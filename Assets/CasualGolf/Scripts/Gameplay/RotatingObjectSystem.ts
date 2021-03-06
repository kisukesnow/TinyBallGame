
namespace casualgf {

    /** New System */
    export class RotatingObjectSystem extends ut.ComponentSystem {
        
        OnUpdate():void {
            if(GameSystem.CurrentGameMode == GameState.GameEnd){
                return;
            }

            //Rotates all the activated rotating object
            this.world.forEach([ut.Entity, ut.Core2D.TransformLocalRotation ,casualgf.RotatingObject], 
                (entity,rotation, RotatingObject) =>{                        
                    if(!RotatingObject.Active){
                        return;
                    }                             
                    if(RotatingObject.InitialRotation == new Quaternion){
                        //Saves the initial rotation
                        RotatingObject.InitialRotation = rotation.rotation;
                    }                            
                    let rotationQuaternion = new Quaternion().setFromAxisAngle(new Vector3(0,0,1), RotatingObject.Speed/100);
                    rotation.rotation = rotation.rotation.multiplyQuaternions(rotation.rotation, rotationQuaternion);                   
                    
                });
        }

        static DeactivateRotatingObjects(world:ut.World){
            world.forEach([ut.Entity, casualgf.RotatingObject], 
                (entity, RotatingObject) =>{       
                    RotatingObject.Active = false;
                });
        }
    }
}