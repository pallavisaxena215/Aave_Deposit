pragma solidity ^0.7.0;
//The interfaces folder contains all the interfaces imported from aave and ERC20 token
import "./interfaces/IERC20.sol";
import "./interfaces/ILendingPool.sol";

contract Aave{
  //The address of the person who invests
  address depositor;
  //The amount the depositor wants to address
  uint initialDeposit;
  //pointer to the LendingPlool interface
  ILendingPool pool;
 //Stable coins used in lending and earning interest
  IERC20 aDai;
  IERC20 dai;

constructor(ILendingPool _pool,IERC20 _aDai, IERC20 _dai){
    depositor = msg.sender; //The person invoking the contract will be declared as the depositor
    pool=_pool;
    dai=_dai;
    aDai=_aDai;
    initialDeposit=0;
}

function depositmoney(uint _amount) public{

initialDeposit=_amount;
//we need to approve the payment of dai before sending them to aave
dai.transferFrom(depositor,address(this),amount);
dai.approve(address(pool),amount);

}

event Approved();

function startSaving() public{
   //sending the dai tokens to Aave 
pool.deposit(address(dai),_amount, address(this),0);
 uint balance = aDai.balanceof(address(this));
    aDai.approve(address(pool),balance);


}

function withdrawmoney() external{
    require(msg.sender==depositor,"Approve must be only be called by the depositor");
    uint balance = aDai.balanceof(address(this));
    aDai.approve(address(pool),balance);



    pool.withdraw(address(dai), type(uint).max, depositor);

				emit Approved();
}



}