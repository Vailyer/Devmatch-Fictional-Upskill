class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  belongs_to :plan
    
  attr_accessor :stripe_card_token
  #If Pro user passes validations(email, password, etc)
  #Then call Stripe and tell Stripe to set up subscription
  #Upon charging the customers card
  #Stripe responds back with customer data
  #Store customer.id as customer token and save user
  def save_with_subscription
    if valid?
      customer = Stripe::Customer.create(description: email, plan: plan_id, card: stripe_card_token)
      self.stripe_customer_token = customer.id
      save!
    end
  end
end
