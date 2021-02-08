# require %{em/pure_ruby}
require %{capybara}
require %{capybara/dsl}
require %{capybara/rspec}
require %{capybara/rspec/matcher_proxies}
require %{rspec/expectations}
require %{rails_helper}
require %{percy}
require %{selenium/webdriver}
require %{selenium-webdriver}
require %{net/http}
require %{rest-client}
require %{json}
require %{pp}
require %{uri}
# load  %{testmod.rb}
# require %{billy/capybara/rspec}



# class Capybara::Selenium::Driver < Capybara::Driver::Base
# 	def reset!
# 		if @browser
# 			@browser.navigate.to('about:blank')
# 		end
# 	end
# end


# dev setup

class Capybara::Node::Element
def select_option(wait: nil)
    begin
	raise 's'
    rescue => exception
	scroll_to self
	synchronize(wait) { base.click }
	self
    end
end
end
Selenium::WebDriver.logger.level = :debug
# Selenium::WebDriver.logger.output = %{selenium.log}
Capybara.raise_server_errors = false
Capybara.run_server = false
Capybara.default_max_wait_time = 5
Capybara.ignore_hidden_elements = false



$client = nil


Capybara.register_driver :internetExplorer do |app|


Capybara::Selenium::Driver.new(
    app,
    :browser => :internet_explorer,
    :options =>   Selenium::WebDriver::IE::Options.new({
	:ignore_zoom_levels => true,
	:ignore_zoom_setting => true,
	# :browser_attach_timeout => 1,
	:javascript_enabled => true,
	:persistent_hover => true,
	# :require_window_focus => true,
	:ignore_protected_mode_settings =>true,
	:ignore_zoom_level => false
    })
)

end

Capybara.register_driver :firefox_profile do |app|
desired_caps = Selenium::WebDriver::Remote::Capabilities.firefox
# desired_caps[:firefox_profile] = %{file:///C:/Users/oluod/My_Notebook/angular/v10/GNDC/CLT-GNDC/testing/e2e/firefox_profile}
# desired_caps[:firefox_profile] = %{C:/Users/oluod/My_Notebook/angular/v10/GNDC/CLT-GNDC/testing/e2e/firefox_profile}
# desired_caps[:firefox_profile] = %{capybara}
service = Selenium::WebDriver::Service.firefox :args => [%{-vv}]
options = Selenium::WebDriver::Firefox::Options.new :args => [%{-profile=C:\\Users\\oluod\\My_Notebook\\angular\\v10\\GNDC\\CLT-GNDC\\testing\\e2e\\firefox_profile}]
# options.profile = Selenium::WebDriver::Firefox::Profile.new %{C:\\Users\\oluod\\My_Notebook\\angular\\v10\\GNDC\\CLT-GNDC\\testing\\e2e\\firefox_profile}

options.log_level = %{trace}
Capybara::Selenium::Driver.new(
    app,
    :browser => :ff,
    :desired_capabilities => desired_caps,
    :options =>   options,
    :service => service
)

end

Capybara.register_driver :edgeBrowser do |app|


	Capybara::Selenium::Driver.new(
			app,
			:browser => :edge,
			:desired_capabilities =>Selenium::WebDriver::Remote::Capabilities::edge({
		:javascript_enabled => true,
		:css_selectors_enabled => true,
			}),
	)

end

Capybara.register_driver :operaDriver do |app|

	Capybara::Selenium::Driver.new(
			app,
			:browser => :opera,
			:desired_capabilities =>Selenium::WebDriver::Remote::Capabilities::edge({
		:javascript_enabled => true,
		:css_selectors_enabled => true,
			}),
	)

end

# Billy.configure do |c|
# 	c.record_requests = true
# end

RSpec.configure do |config|


	# my_drivers = %i{ edgeBrowser internetExplorer selenium }
	# my_drivers = %i{ edgeBrowser }
	# my_drivers = %i{ selenium_billy }
	my_drivers = %i{ selenium}
	# my_drivers = %i{ internetExplorer }
	hosts = Hash.new
	hosts[:dev] =  %{http://localhost:8000}
	# hosts[:homeowner_dev] =  %{http://localhost:4201}
	# hosts[:rental_prod] = %{https://www.guadalupendc.org/online-rental-housing-application}

	config.full_backtrace = false
	config.backtrace_exclusion_patterns = [
			/\/lib\d*\/ruby\//,
			/bin\//,
			/gems/,
			/spec\/spec_helper\.rb/,
			/lib\/rspec\/(core|expectations|matchers|mocks)/
	]

config.before :example do
    page.driver.quit
    begin
	page.driver.close_window page.windows.last.handle
    rescue => exception

    end
    visit %{/}
    page.current_window.maximize
    # $client =  DropboxApi::Client.new %{AN-8rJ0XuEwAAAAAAAAAATUAu6uTWRtwFG8s7WOMmdIoHdYI4Ep2yYw3mOfh5MyO}
end


config.after :example do
    # page.driver.quit
    # begin
    # 	page.driver.close_window page.windows.last.handle
    # rescue => exception

    # end
    #logout
end

config.around do |example|
    $example  = example
    my_drivers.each do |browser|
	hosts.each do |k,v|
	    Capybara.current_driver = browser
	    Capybara.app_host = v
			    # A Identifying and running each scenario
			    # PP.pp example.metadata
			    p Capybara.app_host.to_s +  %{ in } + Capybara.current_driver.to_s
			    p %{scenario #{example.metadata[:description]}}
			    begin
				    example.run
			    rescue => exception
				    page.driver.quit
			    end
			    # A
	end
    end
end
config.after :suite do
    system %{takill /IM MicrosoftEdge.exe -F}
    system %{taskkill /IM MicrosoftWebDrivers.exe}
end
end


def stagingTest
@javascript

	RSpec.feature %{navigation stuff}, :skip => true     do
    # scenario %{I can work with puffing billy} do
    # 	visit %{/}
    # 	# puts TablePrint::Printer.table_print(Billy.proxy.requests, [
    # 	# 	:status,
    # 	# 	:handler,
    # 	# 	:method,
    # 	# 	{ url: { width: 100 } },
    # 	# 	:headers,
    # 	# 	:body
    # 	# ])
	    # end
		scenario %{I can visit the website} do

			visit %{/}
		end
  end

	# works only on play
	RSpec.feature %{ nesting}, :skip => true  do

		scenario %{When I hit add and remove buttons I get what I need} do

			# for the multiples pressing the add & button random times
			adding = rand(6..9)
			removing = rand(3..5)
			adding.times do
				(first %{.f_o_r_m_add-schema}).select_option
			end
			removing.times do
				(first %{.f_o_r_m_remove-schema}).select_option
			end
			sleep 2
			result = (all %{.a_p_p_Count}).length

			expect(result -1 ).to eq (adding - removing)
			#

		end


		scenario %{the subtitle is nested appropriately} do
			sub_heading = first %{.a_p_p_sub-heading}
			p sub_heading
			expect(sub_heading.find(:xpath, '..')[:className]).to start_with(%{a_p_p_Nester})
		end

		scenario %{when i add nested items in div, they are duplicated as intended}  do
			# as this version of Judima, only direct children get copied properly, if an item
			# to be copied has indirect zChildren errors might occur
			add_button = first %{.f_o_r_m_add-schema}
			add_button.select_option
			all_inputs = all %{[class*="f_o_r_m_form-item-container"]}
			# expect there to be a duplicate
			expect(all_inputs.length).to eq 2
			# expect the elements in the form item to be 2
			expect(  (all_inputs.at 1).all(%{*})   ).to eq 2

		end

		scenario %{when nest mutliple acts,
			nothing happens to the formatting of top level desktop}, :skip=>true  do
				add_button = first %{.f_o_r_m_add-schema}
				remove_button = first %{.f_o_r_m_remove-schema}
			after_items = {
				:elements => [
					(all %{[class*="f_o_r_m_schema-mode"]}).to_a ,
					(first %{[class*="f_o_r_m_counter"]})   ,
					(first %{[class*="f_o_r_m_schema-dropdown"]})
				]
			}
			after_items[:elements] = after_items[:elements].flatten
			after_items[:first_top] =  after_items[:elements].collect do |x|
				(x.style %{top})[%{top}]
			end
			add_button.select_option
			after_items[:second_top] =  after_items[:elements].collect do |x|
				(x.style %{top})[%{top}]
			end

			# test that the format does not change
				# might as well test the whole format
			after_items[:first_top].each.with_index do |x,i|
				expect(x).to eq(after_items[:second_top][i])
			end
			#

			# shrink the window
			size = 500
			begin
				page.current_window.resize_to size, 800
			rescue => e
				execute_script %Q{
					resizeTo(#{size},800)
				}
			end
			#

			# check that they are stacked appropriately
			after_items[:third_top] =  after_items[:elements].collect do |x|
				(numberParse :dimension=>(x.style %{top})[%{top}]).to_i
			end
			after_items[:third_top].inject do |acc,x|
				expect(acc).to be < x
				x
			end
			#

			# back to desktop size
			size = 1500
			begin
				page.current_window.resize_to size, 800
			rescue => e
				execute_script %Q{
					resizeTo(#{size},800)
				}
			end
			#

			# check that desktop format is regained
			after_items[:fourth_top] =  after_items[:elements].collect do |x|
				(x.style %{top})[%{top}]
			end
			after_items[:fourth_top].each.with_index do |x,i|
				expect(x).to eq(after_items[:second_top][i])
			end
			#

			PP.pp after_items



		end

		scenario %{when nest mutliple acts, nothing happens to the formatting of top level mobile}  do
			# grab elements
			add_button = first %{.f_o_r_m_add-schema}
			remove_button = first %{.f_o_r_m_remove-schema}
			after_items = {
				:elements => [
					(all %{[class*="f_o_r_m_schema-mode"]}).to_a ,
					(first %{[class*="f_o_r_m_counter"]})   ,
					(first %{[class*="f_o_r_m_schema-dropdown"]})
				]
			}
			after_items[:elements] = after_items[:elements].flatten

			#

			# shrink the window
			size = 500
			begin
				page.current_window.resize_to size, 800
			rescue => e
				execute_script %Q{
					resizeTo(#{size},800)
				}
			end
			add_button.select_option
			#

			# check that they are stacked appropriately
			after_items[:third_top] =  after_items[:elements].collect do |x|
				(numberParse :dimension=>(x.style %{top})[%{top}]).to_i
			end
			after_items[:third_top].inject do |acc,x|
				expect(acc).to be < x
				x
			end
			#

			# back to desktop size
			size = 1500
			begin
				page.current_window.resize_to size, 800
			rescue => e
				execute_script %Q{
					resizeTo(#{size},800)
				}
			end
			#

			# make sure desktop size is working
			after_items[:desktop_top_one] =  after_items[:elements].collect do |x|
				(numberParse :dimension=>(x.style %{top})[%{top}]).to_i
			end
			expect(after_items[:desktop_top_one].at(0)).to eq after_items[:desktop_top_one].at(1)
			expect(after_items[:desktop_top_one].at(2)).to eq after_items[:desktop_top_one].at(3)
			#

			# shrink the window
			size = 500
			begin
				page.current_window.resize_to size, 800
			rescue => e
				execute_script %Q{
					resizeTo(#{size},800)
				}
			end
			add_button.select_option
			#

			# check that they are stacked appropriately
			after_items[:second_top] =  after_items[:elements].collect do |x|
				(numberParse :dimension=>(x.style %{top})[%{top}]).to_i
			end
			after_items[:second_top].inject do |acc,x|
				expect(acc).to be < x
				x
			end
			#


			PP.pp after_items



			end


	end

	RSpec.feature %{latching}, :skip => true do
		scenario %{latching items should exist}  do
			latch_elements = all %{[class*="f_o_r_m_schema-mode"]}
			latch_elements[0].send_keys %{REPEAT}
			latch_elements[1].send_keys %{}
			sleep 2
			latch_attached_elements = all %{.f_o_r_m_mode-handler}
			expect(latch_attached_elements).to be_truthy

		end

		scenario %{latching items should be positioned as intended}  do
			# here the latched elements should be below the element
			latch ={
				:elements => (all %{[class*="f_o_r_m_schema-mode"]}),
				:style => nil,
				:value => 0
			}
			latch[:elements][0].send_keys %{REPEAT}
			latch[:elements][1].send_keys %{}
			sleep 2
			# grab the css for the target and its attachment
			latch_attached = {
				:elements => (all %{.f_o_r_m_mode-handler}),
				:style => nil,
				:value => 0
			}
			latch[:style] = latch[:elements][0].style %{height},%{top}
			latch_attached[:style] = latch_attached[:elements][0].style %{top}
			#

			# calculate the values when ther are supposed to be next to each other
			latch[:style].each do |k,v|

				latch[:value] += (numberParse :dimension => v).to_f
			end
			latch_attached[:style].each do |k,v|

				latch_attached[:value] += (numberParse :dimension => v).to_f
			end
			#

			# test
			expect(latch[:value]).to eq latch_attached[:value]
			#


		end

		scenario %{window resize latch attachment moves with the target} do
			widths = %w{300  1020  1510}.collect &:to_i
			# here the latched elements should be below the element
			latch ={
				:elements => (all %{[class*="f_o_r_m_schema-mode"]}),
				:style => nil,
				:value => 0
			}
			latch[:elements][0].send_keys %{REPEAT}
			latch[:elements][1].send_keys %{}
			sleep 2
			# grab the css for the target and its attachment
			latch_attached = {
				:elements => (all %{.f_o_r_m_mode-handler}),
				:style => nil,
				:value => 0
			}
			#

			widths.each_with_index do |width,i|
				# page.fullscreen

				begin
					page.current_window.resize_to width, 800
				rescue => e
					execute_script %Q{
						resizeTo(#{width},800)
					}
				end
				# see if the values match up
				latch[:style] = latch[:elements][0].style %{height},%{top}
				latch_attached[:style] = latch_attached[:elements][0].style %{top}
				# calculate the values when ther are supposed to be next to each other
				latch[:style].each do |k,v|
					latch[:value] += (numberParse :dimension => v).to_f
				end
				latch_attached[:style].each do |k,v|

					latch_attached[:value] += (numberParse :dimension => v).to_f
				end
				#

				# test
				expect(latch[:value]).to eq latch_attached[:value]
				#

			end

		end

		scenario %{mutliple and or toggle are supported } do
			latch ={
				:elements => (all %{[class*="f_o_r_m_schema-mode"]}),
				:style => nil,
				:value => 0
			}
			# remember latchDirective specifcally works on blur
			latch[:elements][0].send_keys %{REPEAT}
			latch[:elements][1].send_keys %{REPEAT}
			latch[:elements][0].select_option
			sleep 2
			# grab the css for the target and its attachment
			latch_attached = {
				:elements => (all %{.f_o_r_m_mode-handler}),
				:style => [],
				:value => 0
			}
			expect(latch_attached[:elements].length).to eq 2

			latch[:elements][0].send_keys %{REEAT}
			latch[:elements][1].send_keys %{REEAT}
			latch[:elements][0].select_option
			latch_attached[:elements].each.with_index do |x|
				expect((x.style %{display})[%{display}]).to eq %{none}
			end
		end
	end

	RSpec.feature %{nested duplicates}, :skip =>true  do
		scenario %{when outside_duplicates >= 2 and inside_duplicates >  outside_duplicates app doesnt snap} do
			# grab and click add buttons
			outer_add_button = first %{.f_o_r_m_add}
			inner_add_button = first %{.f_o_r_m_add-nested-multiple}
			outer_add_button.click

			rand(4..7).times do
				inner_add_button.click
			end
			#

			# count how many counters end up
			nested_multiple ={
				:elements => (all %{[class*="a_p_p_Count a_p_p_Text f_o_r_m_my-nested-multiple-counter"]}),
			}
			nested_multiple[:counter_value] = nested_multiple[:elements].collect do |x|
				x.text
			end
			expect(   nested_multiple[:counter_value].uniq   ).to eq nested_multiple[:counter_value]

		end

		scenario %{when when outside_duplicates === 0 && inside_duplicates >  outside_duplicates on add only app doesnt snap} do

			# switch between mobile and desktop widths
			widths = %w{300  1020  1510}.collect &:to_i
			#

			# grab and click add buttons
			outer_add_button = first %{.f_o_r_m_add}
			inner_add_button = first %{.f_o_r_m_add-nested-multiple}


			rand(4..7).times do
				media_query  :width => widths.at(rand widths.size)
				outer_add_button.click
			end

			rand(4..7).times do
				media_query  :width => widths.at(rand widths.size)
				inner_add_button.click
			end
			#

			# count how many counters end up
			nested_multiple ={
				:elements => (all %{[class*="a_p_p_Count a_p_p_Text f_o_r_m_my-nested-multiple-counter"]}),
			}
			nested_multiple[:counter_value] = nested_multiple[:elements].collect do |x|
				x.text
			end
			outer_multiple ={
				:elements => (all %{[class*="a_p_p_Count a_p_p_Text f_o_r_m_my-top-level-input-counter"]}),
			}
			outer_multiple[:counter_value] = nested_multiple[:elements].collect do |x|
				x.text
			end
			expect(   nested_multiple[:counter_value].uniq   ).to eq nested_multiple[:counter_value]
			expect(   outer_multiple[:counter_value].uniq   ).to eq outer_multiple[:counter_value]

		end
	end
	RSpec.feature %{staging}  do
		scenario %{add and remove in all states desktop and mobile looks fine} do


			widths = %w{300  1020  1510}.collect &:to_i
			add_button = []
			remove_button =  []
			error_indicator = first %{.f_o_r_m_my-indicator}
			error_message = first %{.f_o_r_m_my-indicator-message}

			(all %{[class*="f_o_r_m_add"]}).each do |x|
				add_button.push(x)
			end
			(all %{[class*="f_o_r_m_remove"]}).each do |x|
				remove_button.push(x)
			end
			add_button = add_button.concat add_button
			add_button = add_button.concat add_button
			add_button = add_button.concat remove_button
			click_amnt = rand(1250..1300)
			p click_amnt

			click_amnt.times do |x|
				p x
				target_button = add_button.sample
				width = widths.sample
				p target_button[:class]
				p target_button.find(:xpath, '..')[:class]
				p error_message.text
				p width
				target_button.click
				media_query :width => width
				expect(error_indicator.text).not_to eq %{An error occured}
			end

			sleep 600000000000
		end

	end
end



def numberParse  devObj
    dimension = devObj[:dimension]
    (dimension.split %{px}).at 0
end

def media_query devObj
	begin
		page.current_window.resize_to devObj[:width], 800
	rescue => e
		execute_script %Q{
			resizeTo(#{devObj[:width]},800)
		}
	end
end

stagingTest
